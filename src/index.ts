import "./iterable2";
// one vs many
// setter vs getter
// sync implies getter & pull
// async implies setter & push
// many implies getter => gettter 闭包存变量

/* 

getter|one => function

getter|many => Iterable


*/

// sync value
type Sync<T> = T;

// async value
type Async<T> = Promise<T>;

/*
@desc: sync getter
@example: Math.random(), uuid()
*/
interface SyncGetter<T> {
  (): Sync<T>;
}
Math.random();
/*
  @desc: async getter aka task
  @example: 
*/
interface AsyncGetter<T> {
  (): Async<T>;
}
async function task() {
  return new Promise(resolve => {
    setTimeout(() => resolve(10), 1000);
  });
}

// getter
interface Getter<T> {
  (): T;
}
// getter method
interface GetterMethod<T> {
  method(): T;
}
// setter
interface Setter<T> {
  (x: T): void;
}
// setter method
interface SetterMethod<T> {
  method(x: T): void;
}

// iterable

// get
interface Enumerator<T> {
  next(): T;
}
// get => get
interface Enumerable<T> {
  [Symbol.iterator](): Enumerator<T>;
}

// observable

// set
interface Observer<T> {
  next(val: T): void;
}
// set => set
interface Observable<T> {
  subscribe(o: Observer<T>): void;
}

// promise

// set
interface Executor<T> {
  (resolve: Setter<T>): void;
}
// set => set => set
interface Promise2<T> {
  (executor: Executor<T>): void;
}

// functor
declare function map<A, B>(fn: (x: A) => B): (x: Getter<A>) => Getter<B>;

// cofunctor
declare function cmap<A, B>(fn: (x: A) => B): (x: Setter<A>) => Setter<B>;

let x: Promise2<string>;
