import { createElement } from 'react';

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        let taged = document.createElement(tag);
        taged.append(content);
        document.body.append(taged);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
function add(node, childrenCount, level, item) {
    if (level == 1) {
        return node;
    }
    for (let i = 0; i < childrenCount; i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'item_' + (item - level + 2));
        node.append(add(div, childrenCount, level - 1, item));
    }
    return node;
}
export function generateTree(childrenCount, level) {
    let div = document.createElement('div');
    div.setAttribute('class', 'item_1');
    div = add(div, childrenCount, level, level);
    return div;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let elem = generateTree(2, 3);
    let a = elem.getElementsByClassName('item_2');
    for (let key of a) {
        let section = document.createElement('section');
        section.innerHTML = key.innerHTML;
        for (let q of key.attributes) {
            section.setAttribute(q.nodeName, q.nodeValue);
        }
        key.parentNode.replaceChild(section, key);
    }
    return elem;
}
