const lists = document.querySelectorAll('.list')
const addBoardBtn = document.querySelector('.add__board-btn')

const addTask = () => {
  const addBtn = document.querySelector('.add-btn')
  const addItemBtn = document.querySelector('.add__item-btn')
  const cancelBtn = document.querySelector('.cancel__item-btn')
  const form = document.querySelector('.form')
  const textarea = document.querySelector('.textarea')

  let inputValue

  const clearForm = () => {
    textarea.value = ''
    inputValue = ''
    form.style.display = 'none'
    addBtn.style.display = 'block'
  }

  addBtn.addEventListener('click', () => {
    form.style.display = 'block'
    addBtn.style.display = 'none'
    addItemBtn.style.display = 'none'
  })

  textarea.addEventListener('input', e => {
    inputValue = e.target.value
    inputValue
        ? addItemBtn.style.display = 'flex'
        : addItemBtn.style.display = 'none'
  })

  cancelBtn.addEventListener('click', () => {
    clearForm()
  })

  addItemBtn.addEventListener('click', () => {
    const newItem = document.createElement('div')
    newItem.classList.add('list__item')
    newItem.setAttribute('draggable', 'true')
    newItem.textContent = inputValue
    lists[0].append(newItem)

    clearForm()
    dragAndDrop()
  })
}

const addBoard = () => {
  const boards = document.querySelector('.boards')
  const newBoard = document.createElement('div')
  newBoard.classList.add('boards__item')
  newBoard.innerHTML =
      `<div class="board__header">
        <span contenteditable="true" class="title">Введите название</span>
        <img src="../img/removeBoard.png" class="remove__board" alt="Remove Board">
      </div>
      <div class="list"></div>`
  boards.append(newBoard)

  changeTitle()
  dragAndDrop()
  removeBoard()
}

addBoardBtn.addEventListener('click', addBoard)


const changeTitle = () => {
  const titles = document.querySelectorAll('.title')

  titles.forEach( title => {
    title.addEventListener('click', e => e.target.textContent = '')
  })
}

const dragAndDrop = () => {
  const lists = document.querySelectorAll('.list')
  const listItems = document.querySelectorAll('.list__item')

  let draggedItem = ''

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i]

    item.addEventListener('dragstart', () => {
      draggedItem = item
      setTimeout(() => {
        item.style.display = 'none'
      }, 0)
    })

    item.addEventListener('dragend', () => {
      draggedItem = ''
      setTimeout(() => {
        item.style.display = 'block'
      }, 0)
    })

    item.addEventListener('dblclick', () => {
      if (window.confirm('Действительно хотите удалить таску?')) item.remove()
    })

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j]

      list.addEventListener('dragover', e => e.preventDefault())
      list.addEventListener('dragenter', function (e) {
        e.preventDefault()
        this.style.backgroundColor = 'rgba(0, 0, 0, .3)'
      })
      list.addEventListener('dragleave', function () {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0)'
      })
      list.addEventListener('drop', function () {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        this.append(draggedItem)
      })
    }
  }
}

const removeBoard = () => {
  const boards = document.querySelectorAll('.boards__item')
  const removeBoardButtons = document.querySelectorAll('.remove__board')

  for (let i = 0; i < removeBoardButtons.length; i++) {
    const btn = removeBoardButtons[i]
    btn.addEventListener('click', () => {
      boards[i+1].remove()
    })
  }

}

dragAndDrop()
changeTitle()
addTask()