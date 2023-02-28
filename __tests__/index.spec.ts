import { createProxy, Listener } from '../src';
import { expect } from 'chai';

type Dog = {
  name: string;
  age: number;
  breed?: string;
  sickness?: string[] | null;
}


const dog: Dog = {
  name: 'Rex',
  age: 3,
  breed: 'Labrador'
};

describe('Change Properties', () => {
  
  beforeEach(()=> {
    dog.name = 'Rex';
    dog.age = 3;
    dog.breed = 'Labrador';
  })

  it('callbacks should be fired when the property is changed', () => {
    const listener: Listener<Dog> = {
      onNameChange: (value, oldValue) => {
        expect(value).to.equal('Rexy');
        expect(oldValue).to.equal('Rex');
      },
      onAgeChange: (value, oldValue) => {
        expect(value).to.equal(4);
        expect(oldValue).to.equal(3);
      },
      onBreedChange: (value, oldValue) => {
        expect(value).to.equal('Poodle');
        expect(oldValue).to.equal('Labrador');
      }
    };
    const proxyDog = createProxy(dog, listener);
    proxyDog.name = 'Rexy';
    proxyDog.age = 4;
    proxyDog.breed = 'Poodle';
  });

  it('callbacks should not be fired when the property is not changed', () => {
    const listener: Listener<Dog> = {
      onNameChange: () => {
        throw new Error('onNameChange should not be called');
      },
      onAgeChange: () => {
        throw new Error('onAgeChange should not be called');
      },
      onBreedChange: () => {
        throw new Error('onBreedChange should not be called');
      }
    };
    const proxyDog = createProxy(dog, listener);
    proxyDog.name = 'Rex';
    proxyDog.age = 3;
    proxyDog.breed = 'Labrador';
  });

  it('callbacks should be fired when the property is changed to undefined or null', () => {
    const listener: Listener<Dog> = {
      onBreedChange: (value, oldValue) => {
        expect(value).to.equal(undefined);
        expect(oldValue).to.equal('Labrador');
      },
      onSicknessChange: (value, oldValue) => {
        expect(value).to.equal(null);
        expect(oldValue).to.eql(['cough', 'fever']);
      },
      onSicknessAdd: (value, target) => {},
    };
    const proxyDog = createProxy(dog, listener);
    proxyDog.sickness = ['cough', 'fever'];
    proxyDog.breed = undefined;
    proxyDog.sickness = null;
  });
});

describe('Delete Properties', () => {

   beforeEach(()=> {
    dog.name = 'Rex';
    dog.age = 3;
  });

  it('callbacks should be fired when the property is deleted', () => {
    const listener: Listener<Dog> = {
      onBreedDelete: (oldValue, target) => {
        expect(oldValue).to.equal('Labrador');
        expect(target?.breed).to.equal(undefined)
      },
      onSicknessDelete: (oldValue, target) => {
        expect(oldValue).to.equal(null);
        expect(target?.sickness).to.equal(undefined)
      }
    };
    const proxyDog = createProxy(dog, listener);
    proxyDog.breed = 'Labrador';
    delete proxyDog.breed;
    delete proxyDog.sickness;
  });

  it('callbacks should not be fired when the property is not deleted', () => {
    const listener: Listener<Dog> = {
      onBreedDelete: () => {
        throw new Error('onBreedDelete should not be called');
      },
      onSicknessDelete: () => {
        throw new Error('onSicknessDelete should not be called');
      }
    };
    const proxyDog = createProxy(dog, listener);
    delete proxyDog.breed;
    delete proxyDog.sickness;
  });

  it('callbacks should not be fired when the property is set to undefined or null', () => {
    const listener: Listener<Dog> = {
      onBreedDelete: () => {
        throw new Error('onBreedDelete should not be called');
      },
      onSicknessDelete: () => {
        throw new Error('onSicknessDelete should not be called');
      }
    };
    const proxyDog = createProxy(dog, listener);
    proxyDog.breed = undefined;
    proxyDog.sickness = null;
  });
});

describe('Add Properties', () => {

   beforeEach(()=> {
    dog.name = 'Rex';
    dog.age = 3;
  })

  it('callbacks should be fired when the property is added', () => {
    let test = false;
    const listener: Listener<Dog> = {
      onBreedAdd: (value, target) => {
        test = true;
        expect(value).to.equal('Labrador');
        expect(target?.breed).to.equal('Labrador')
      }
    };
    const proxyDog = createProxy(dog, listener);
    proxyDog.breed = 'Labrador';
    expect(test).to.equal(true);
  });

  it('callbacks should not be fired when the property is not added', () => {
    const listener: Listener<Dog> = {
      onSicknessAdd: () => {
        throw new Error('onSicknessAdd should not be called');
      }
    };
    const proxyDog = createProxy(dog, listener);
    proxyDog.sickness = null;
  });
});
