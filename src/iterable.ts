class Component {
  constructor(public name: string) {
      
  }
}

class Frame implements Iterator<Component>{
  private pointer = 0;
  constructor(public name: string, public components: Component[]) {
      
  }
  public next(): IteratorResult<Component> {
      if (this.pointer < this.components.length) {
          return {
              done: false,
              value: this.components[this.pointer++]
          }
      } else {
          return {
              done: true,
              value: undefined
          }
      }
      
  }
}

const frame = new Frame('door', [new Component('top'), new Component('bottom')]);
for(let x=frame.next();x.done !==true;x = frame.next()){
  console.log('frame1:',x.value);
}

class Frame2 implements Iterable<Component> {
  constructor(public name: string, public components: Component[]) {
      
  }
  [Symbol.iterator](): Iterator<Component> {
      let pointer = 0;
      let components = this.components;
      return {
          next(): IteratorResult<Component> {
              if (pointer < components.length) {
                  return {
                      done: false,
                      value: components[pointer++]
                  }
              } else {
                  return {
                      done: true,
                      value: undefined
                  }
              }
          }
      }
  }
}

for(const x of new Frame2('top', [new Component('top'), new Component('bottom')])){
  console.log('frame2:',x);
}

class Frame3 implements IterableIterator<Component> {
  private pointer =0;
  constructor(public name: string, public components: Component[]){

  }
  public next(): IteratorResult<Component> {
    if(this.pointer < this.components.length){
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    }else{
      return {
        done: true,
        value: null
      }
    }
  }
  [Symbol.iterator](): IterableIterator<Component> {
      return this;
  }
}

const frame3 = new Frame('door', [new Component('top'), new Component('bottom')]);
for(let x=frame3.next();x.done !==true;x = frame3.next()){
  console.log('frame4:',x.value);
}

for(const x of new Frame3('door', [new Component('top'), new Component('bottom')]) ){
  console.log('frame3.1:',x);
}


class Frame4 implements Iterable<Component> {
  private pointer =0;
  constructor(public name: string, public components: Component[]){

  }
  *gen(): IterableIterator<Component> {
    while(this.pointer<this.components.length){
      yield this.components[this.pointer++]
    }
  }
  [Symbol.iterator](){
    return this.gen();
  }
}




let frame4 = new Frame4('door', [new Component('top'),new Component('bottom')])

for(const x of frame4){
  console.log('frame4:', x);
}




