declare module 'simple-peer' {
  interface Instance {
    signal(data: any): void;
    destroy(): void;
    on(event: string, callback: (data: any) => void): void;
  }

  interface SimplePeerStatic {
    new(opts?: any): Instance;
  }

  const SimplePeer: SimplePeerStatic;
  export = SimplePeer;
}