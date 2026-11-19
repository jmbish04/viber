import { createObjectLogger } from '../../logger';
import {
        AssetManifest,
        WorkerMetadata,
        WorkerBinding,
        WranglerConfig,
        PreparedDeployment,
} from './types';
import { mergeMigrations, extractDurableObjectClasses } from './utils/index';

const logger = createObjectLogger('WorkerDeployer');

/**
 * Main deployment orchestrator for Cloudflare Workers
 * Handles packaging worker output for GitHub publication
 */
export class WorkerDeployer {
        constructor(accountId: string, apiToken: string) {
                logger.info('Initializing WorkerDeployer', {
                        accountIdPresent: Boolean(accountId),
                        apiTokenPresent: Boolean(apiToken),
                });
        }

        /**
         * Deploy a Worker with static assets
         * In the new single-worker architecture this method prepares the
         * worker bundle metadata that will be committed to GitHub.
         */
        async deployWithAssets(
                scriptName: string,
                workerContent: string,
                compatibilityDate: string,
                assetsManifest: AssetManifest,
                fileContents: Map<string, Buffer>,
                bindings?: WorkerBinding[],
                vars?: Record<string, string>,
                assetsConfig?: WranglerConfig['assets'],
                additionalModules?: Map<string, string>,
                compatibilityFlags?: string[],
                migrations?: WranglerConfig['migrations'],
        ): Promise<PreparedDeployment> {
                logger.info('Preparing deployment package with assets');

                const metadata: WorkerMetadata = {
                        main_module: 'index.js',
                        compatibility_date: compatibilityDate,
                        compatibility_flags: compatibilityFlags,
                        bindings: bindings || [],
                };

                metadata.assets = {
                        manifest: assetsManifest,
                        config: {
                                not_found_handling: assetsConfig?.not_found_handling as
                                        | 'single-page-application'
                                        | '404-page'
                                        | 'none'
                                        | undefined,
                        },
                };

                // Add migrations for Durable Objects
                const mergedMigration = mergeMigrations(migrations);
                if (mergedMigration) {
                        metadata.migrations = mergedMigration;

			// Extract all DO classes for exported_handlers
			const doClasses = extractDurableObjectClasses(mergedMigration);
			if (doClasses.length > 0) {
				metadata.exported_handlers = doClasses;
			}
		}

                if (vars && Object.keys(vars).length > 0) {
                        metadata.vars = vars;
                }

                logger.info('Deployment package prepared', {
                        scriptName,
                        assetCount: Object.keys(assetsManifest).length,
                        additionalModuleCount: additionalModules?.size ?? 0,
                });

                return {
                        scriptName,
                        metadata,
                        workerContent,
                        assetsManifest,
                        assetContents: fileContents,
                        additionalModules,
                };
        }

        /**
         * Deploy a Worker without static assets
         * For single-worker mode this simply creates a metadata payload
         * that downstream GitHub automation can consume.
         */
        async deploySimple(
                scriptName: string,
                workerContent: string,
                compatibilityDate: string,
                bindings?: WorkerBinding[],
                vars?: Record<string, string>,
                additionalModules?: Map<string, string>,
                compatibilityFlags?: string[],
                migrations?: WranglerConfig['migrations'],
        ): Promise<PreparedDeployment> {
                logger.info('Preparing deployment package without assets');
                const metadata: WorkerMetadata = {
                        main_module: 'index.js',
                        compatibility_date: compatibilityDate,
                        compatibility_flags: compatibilityFlags,
                        bindings: bindings || [],
		};

		// Add migrations for Durable Objects
		const mergedMigration = mergeMigrations(migrations);
		if (mergedMigration) {
			metadata.migrations = mergedMigration;

			// Extract all DO classes for exported_handlers
			const doClasses = extractDurableObjectClasses(mergedMigration);
			if (doClasses.length > 0) {
				metadata.exported_handlers = doClasses;
			}
		}

                if (vars && Object.keys(vars).length > 0) {
                        metadata.vars = vars;
                }

                logger.info('Deployment package prepared (no assets)', {
                        scriptName,
                        additionalModuleCount: additionalModules?.size ?? 0,
                });

                return {
                        scriptName,
                        metadata,
                        workerContent,
                        additionalModules,
                };
        }
}
