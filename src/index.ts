type ChangeListener<T> = {
  [P in keyof T as `on${Capitalize<string & P>}Change`]?: (value?: T[P], oldValue?: T[P]) => void
}

type DeleteListener<T> = {
  [P in keyof T as `on${Capitalize<string & P>}Delete`]?: (oldValue?: T[P]) => void
}

export type Listener<T> = ChangeListener<T> & DeleteListener<T>;

export function createProxy<T extends {[key: string]: any}>(
  obj: T,
  listener: Listener<T>
): T {
  const handler: ProxyHandler<T> = {
    set(target, key: string & keyof T, value) {
      const prevValue = target[key];
      target[key] = value;
      const listenerKey = `on${key[0].toUpperCase()}${key.slice(1)}Change` as keyof Listener<T>;
      if (listener[listenerKey] && listener[listenerKey] instanceof Function) {
        const listenerFunc = listener[listenerKey] as (newValue: typeof value, oldValue: typeof prevValue) => void;
        listenerFunc(value, prevValue);
      }
      return true;
    }
  }
  return new Proxy(obj, handler);
}