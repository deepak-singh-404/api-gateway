import { Injectable, Logger } from "@nestjs/common";
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from "@nestjs/terminus";
import { CustomException } from "src/exception/custom-exception";

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator
  ) {}

  async _pingPong(): Promise<any> {
    try {
      return "pong";
    } catch (err) {
      this.logger.error(err.message);
      throw new CustomException(err.message);
    }
  }

  async _healthCheck(): Promise<any> {
    try {
      return this.health.check([
        // () => this.http.pingCheck('basic check', `http://localhost:${process.env.PORT}`),
        () =>
          this.disk.checkStorage("diskStorage", {
            thresholdPercent: 0.5,
            path: "/",
          }),
        () => this.memory.checkHeap("memory_heap", 300 * 1024 * 1024),
        () => this.memory.checkRSS("memory_rss", 300 * 1024 * 1024),

        //DB CHECK
        //REDIS CHECK
      ]);
    } catch (err) {
      this.logger.error(err.message);
      throw new CustomException(err.message);
    }
  }
}
