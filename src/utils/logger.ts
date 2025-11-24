/**
 * Logger Utility
 * Centralized logging with levels and formatting
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogConfig {
  enabled: boolean;
  level: LogLevel;
  timestamp: boolean;
  colors: boolean;
}

const defaultConfig: LogConfig = {
  enabled: import.meta.env.DEV,
  level: 'debug',
  timestamp: true,
  colors: true,
};

class Logger {
  private config: LogConfig;
  private levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  private colors = {
    debug: '#9CA3AF',    // Gray
    info: '#3B82F6',     // Blue
    warn: '#F59E0B',     // Orange
    error: '#EF4444',    // Red
    timestamp: '#6B7280', // Gray
  };

  constructor(config: Partial<LogConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Check if log level should be printed
   */
  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;
    return this.levels[level] >= this.levels[this.config.level];
  }

  /**
   * Format timestamp
   */
  private getTimestamp(): string {
    const now = new Date();
    return now.toISOString().split('T')[1].split('.')[0];
  }

  /**
   * Format log message
   */
  private formatMessage(level: LogLevel, message: string, data?: unknown): string[] {
    const parts: string[] = [];

    if (this.config.timestamp) {
      parts.push(`[${this.getTimestamp()}]`);
    }

    parts.push(`[${level.toUpperCase()}]`);
    parts.push(message);

    return parts;
  }

  /**
   * Print log to console with styling
   */
  private print(level: LogLevel, message: string, data?: unknown): void {
    if (!this.shouldLog(level)) return;

    const parts = this.formatMessage(level, message);
    const color = this.colors[level];

    if (this.config.colors && typeof window !== 'undefined') {
      // Browser with colors
      console.log(
        `%c${parts.join(' ')}`,
        `color: ${color}; font-weight: ${level === 'error' ? 'bold' : 'normal'}`
      );
    } else {
      // Node or no colors
      console.log(parts.join(' '));
    }

    // Print data if provided
    if (data !== undefined) {
      console.log(data);
    }
  }

  /**
   * Debug level log
   */
  debug(message: string, data?: unknown): void {
    this.print('debug', message, data);
  }

  /**
   * Info level log
   */
  info(message: string, data?: unknown): void {
    this.print('info', message, data);
  }

  /**
   * Warning level log
   */
  warn(message: string, data?: unknown): void {
    this.print('warn', message, data);
  }

  /**
   * Error level log
   */
  error(message: string, data?: unknown): void {
    this.print('error', message, data);
    
    // TODO: Send to error tracking service
    // this.sendToErrorTracking(message, data);
  }

  /**
   * Group logs together
   */
  group(label: string, callback: () => void): void {
    if (!this.shouldLog('debug')) return;
    
    console.group(label);
    callback();
    console.groupEnd();
  }

  /**
   * Log API request
   */
  apiRequest(method: string, endpoint: string, data?: unknown): void {
    this.debug(`API ${method} ${endpoint}`, data);
  }

  /**
   * Log API response
   */
  apiResponse(method: string, endpoint: string, status: number, data?: unknown): void {
    const level = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'info';
    this.print(level, `API ${method} ${endpoint} → ${status}`, data);
  }

  /**
   * Log state change (for Zustand)
   */
  stateChange(storeName: string, action: string, prevState: unknown, nextState: unknown): void {
    this.group(`State Change: ${storeName}.${action}`, () => {
      console.log('%cPrevious:', 'color: #F59E0B', prevState);
      console.log('%cNext:', 'color: #10B981', nextState);
    });
  }

  /**
   * Log performance metric
   */
  performance(label: string, duration: number): void {
    const color = duration > 1000 ? '#EF4444' : duration > 500 ? '#F59E0B' : '#10B981';
    console.log(
      `%c[PERF] ${label}: ${duration}ms`,
      `color: ${color}; font-weight: bold`
    );
  }

  /**
   * Create performance timer
   */
  startTimer(label: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.performance(label, Math.round(duration));
    };
  }

  /**
   * Update configuration
   */
  configure(config: Partial<LogConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Enable logging
   */
  enable(): void {
    this.config.enabled = true;
  }

  /**
   * Disable logging
   */
  disable(): void {
    this.config.enabled = false;
  }
}

/**
 * Default logger instance
 */
export const logger = new Logger();

/**
 * Export Logger class for custom instances
 */
export { Logger };

/**
 * Convenience exports
 */
export const log = {
  debug: logger.debug.bind(logger),
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
  group: logger.group.bind(logger),
  api: {
    request: logger.apiRequest.bind(logger),
    response: logger.apiResponse.bind(logger),
  },
  state: logger.stateChange.bind(logger),
  perf: {
    log: logger.performance.bind(logger),
    start: logger.startTimer.bind(logger),
  },
};
