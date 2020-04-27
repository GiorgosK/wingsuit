import TwigAttribute from "../src/TwigAttribute";

describe("TwigAttribute test", () => {
  let twigAttribute:TwigAttribute = new TwigAttribute();
  beforeEach(() => {
    twigAttribute = new TwigAttribute();
  })
  test('addClass.', function () {
    twigAttribute.addClass('class1 class2');
    twigAttribute.addClass('class3 class4');
    twigAttribute.addClass(' class5   class6    ');
    expect(twigAttribute.toString()).toBe('class="class1 class2 class3 class4 class5 class6"');
  });
  test('setAttribute', function () {
    twigAttribute.setAttribute('attr1', 'value1');
    twigAttribute.setAttribute('attr2', 'value2');
    expect(twigAttribute.toString()).toBe('attr1="value1" attr2="value2"');
  });
  test('removeClass.', function () {
    twigAttribute.addClass('class1 class2');
    twigAttribute.addClass('class3 class4');
    twigAttribute.removeClass('class3');
    expect(twigAttribute.toString()).toBe('class="class1 class2 class4"');
  });
  test('removeAttribute.', function () {
    twigAttribute.setAttribute('attr1', 'value1');
    twigAttribute.setAttribute('attr2', 'value2');
    twigAttribute.removeAttribute('attr1');
    expect(twigAttribute.toString()).toBe('attr2="value2"');
  });
});