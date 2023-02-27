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
    proxyDog.name = 'Rexy';
    proxyDog.age = 4;
    proxyDog.breed = 'Poodle';
  });

  it('callbacks should be fired when the property is changed to undefined or null', () => {
    const listener: Listener<Dog> = {
      onBreedChange: (value, oldValue) => {
        expect(value).to.equal(undefined);
        expect(oldValue).to.equal('Poodle');
      },
      onSicknessChange: (value, oldValue) => {
        expect(value).to.equal(null);
        expect(oldValue).to.equal(undefined);
      }
    };
    const proxyDog = createProxy(dog, listener);
    proxyDog.breed = undefined;
    proxyDog.sickness = null;
  });


});