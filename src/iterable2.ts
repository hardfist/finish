function getGetNext() {
  let i = 40;
  return function getNext(): IteratorResult<number> {
    if (i <= 48) {
      const next = i;
      i += 2;
      return { done: false, value: next };
    } else {
      return { done: true, value: undefined };
    }
  };
}
for (
  let getNext = getGetNext(), result = getNext();
  !result.done;
  result = getNext()
) {
  console.log("result0:", result.value);
}
class GetNext implements Iterator<number> {
  i = 42;
  public next() {
    if (this.i <= 48) {
      const next = this.i;
      this.i += 2;
      return { done: false, value: next };
    } else {
      return { done: true, value: undefined };
    }
  }
}

for (
  let obj = new GetNext(), result = obj.next();
  !result.done;
  result = obj.next()
) {
  console.log("result1:", result.value);
}

class GetNext2 implements Iterable<number> {
  [Symbol.iterator]() {
    return {
      i: 42,
      next() {
        if (this.i <= 48) {
          const next = this.i;
          this.i += 2;
          return { done: false, value: next };
        } else {
          return { done: true, value: undefined };
        }
      }
    };
  }
}

for (const x of new GetNext2()) {
  console.log("result2:", x);
}

class GetNext3 implements IterableIterator<number> {
  private i = 42;
  public next(): IteratorResult<number> {
    if (this.i < 48) {
      return {
        done: false,
        value: this.i++
      };
    } else {
      return {
        done: true,
        value: undefined
      };
    }
  }
  [Symbol.iterator](): IterableIterator<number> {
    return this;
  }
}

for (const x of new GetNext3()) {
  console.log("GetNext3:", x);
}

for (
  let obj = new GetNext3(), result = obj.next();
  !result.done;
  result = obj.next()
) {
  console.log("result3.1:", result.value);
}

function* GetNext4(i = 42) {
  while (i < 48) {
    yield i++;
  }
}
for (const x of GetNext4()) {
  console.log("GetNext4:", x);
}
for (let gen = GetNext4(), x = gen.next(); !x.done; x = gen.next()) {
  console.log("GetNext4.1", x);
}
