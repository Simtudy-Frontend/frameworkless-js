import { faker } from "@faker-js/faker";
import { Todo } from "@shared/types";

const createElement = () => ({
  text: faker.lorem.words(),
  completed: faker.datatype.boolean(),
  id: faker.number.int(),
});

const repeat = (elementFactory: Todo, repeatNumber: number) => {
  const array = [];
  for (let index = 0; index < repeatNumber; index++) {
    array.push(elementFactory);
  }
  return array;
};

export default () => {
  const repeatNumberRandom = faker.number.int(10);
  return repeat(createElement(), repeatNumberRandom);
};
