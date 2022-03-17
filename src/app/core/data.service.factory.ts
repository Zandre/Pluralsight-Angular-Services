import { LoggerService } from "./logger.service";
import { DataService } from "./data.service";

export function dataServiceFactory(logger: LoggerService) {
    let dataService: DataService = new DataService(logger);

    // do more stuff to configyre the service if necessary

    logger.log('Creating a new data service with a factory');

    return dataService;
}