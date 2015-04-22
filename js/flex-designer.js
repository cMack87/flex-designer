var mainContainer;

var createCell = function() {
  var cell = document.createElement('div');
  var controls = document.querySelector('.controls').cloneNode(true);
  cell.appendChild(controls);
  cell.classList.add('cell');
  cell.classList.add('top');
  cell.setAttribute('data-size', '1');
  cell.setAttribute('data-direction', 'row');
  return cell;
}

var split = function(cell, direction) {
  // create 2 new cells as children of current cell
  cell.appendChild(createCell());
  cell.appendChild(createCell());
  cell.classList.remove('top');
  if (direction) cell.setAttribute('data-direction', direction);
}

var add = function(cell, position) {
  if (position == 'before')
    cell.parentNode.insertBefore(createCell(), cell);
  else
    cell.parentNode.insertBefore(createCell(), cell.nextSibling);
}

var rotate = function(cell) {
  var direction = cell.parentNode.getAttribute('data-direction');
  direction = direction == 'row' ? 'column' : 'row';
  cell.parentNode.setAttribute('data-direction', direction);
  redraw(mainContainer);
}

var shrink = function(cell) {
  var size = parseInt(cell.getAttribute('data-size'));
  size = size > 1 ? size-1 : 1;
  cell.setAttribute('data-size', size);
  cell.style.flexGrow = size;
  cell.querySelector('.cellSize').innerHTML = size;
}

var grow = function(cell) {
  var size = parseInt(cell.getAttribute('data-size'));
  size = size < 10 ? size+1 : 10;
  cell.setAttribute('data-size', size);
  cell.querySelector('.cellSize').innerHTML = size;
  cell.style.flexGrow = size;
}

var remove = function(cell) {
  var cellCount = mainContainer.querySelectorAll('.cell').length;
  if (cellCount == 1) return;
  
  var container = cell.parentNode;
  container.removeChild(cell);
  
  // if a cell contains only 1 cell, remove that redundant inner cell
  if (cellCount > 2 && container.querySelectorAll('.cell').length == 1) {
    container.removeChild(container.querySelector('.cell'));
    container.classList.add('top');
  } 
  
}

var redraw = function(e) {
  e.style.display='none';
  e.offsetHeight;
  e.style.display='';
}

document.addEventListener('DOMContentLoaded', function() {
  mainContainer = document.querySelector('.container');
  selector = document.querySelector('.selector');
  var controls = document.querySelector('.controls');
  
  mainContainer.addEventListener('click', function(e) {
    var action = e.target.getAttribute('data-action');
    var cell = e.target.parentNode.parentNode;
    if (action == 'split-horizontal') split(cell, 'column');
    else if (action == 'split-vertical') split(cell, 'row');
    else if (action == 'add-before') add(cell, 'before');
    else if (action == 'add-after') add(cell, 'after');
    else if (action == 'rotate') rotate(cell);
    else if (action == 'grow') grow(cell);
    else if (action == 'shrink') shrink(cell);
    else if (action == 'delete') remove(cell);
    else if (action == 'show-json') show_json(mainContainer);
  });
  
});

var show_json = function(container) {
  var jsonObject = [];
  var cells = container.querySelectorAll('.cell');
  
  [].forEach.call(cells, function(cell) {
    jsonObject.push({
      size: cell.getAttribute('data-size'),
      direction: cell.getAttribute('data-direction')
    });
  });
  
  console.log(jsonObject, jsonObject.length);
}

var next = function(cell) {
  this.style.transform = 'translateX(-2000px)';  
}