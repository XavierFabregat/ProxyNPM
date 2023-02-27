import { createProxy, Listener } from '../src';
import { expect } from 'chai';

type Dog = {
  name: string;
  age: number;
  breed?: string;
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
});