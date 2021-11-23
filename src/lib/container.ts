type DependencyFactory<T> = (container: DependencyContainer) => T;

export interface DependencyContainer {
  register<T>(token: any, factory: DependencyFactory<T>): void;
  resolve<T>(token: any): T;
}

class SingletonContainer implements DependencyContainer {
  private readonly declarations = new Map<any, DependencyFactory<any>>();
  private readonly instanceCache = new Map<any, any>();

  register<T>(token: any, factory: DependencyFactory<T>): void {
    if (this.declarations.has(token)) {
      throw new TokenError(`Token ${token} already registered!`);
    }
    this.declarations.set(token, factory);
  }

  resolve<T>(token: any): T {
    if (!this.declarations.has(token)) {
      throw new TokenError(`Token ${token} is not registered!`);
    }

    if (!this.instanceCache.has(token)) {
      this.instanceCache.set(token, this.declarations.get(token)!(this));
    }
    return this.instanceCache.get(token)!;
  }
}

class TokenError extends Error {}

export const container = new SingletonContainer();
