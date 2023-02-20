// 'DOMContentLoaded' event

document.addEventListener('DOMContentLoaded', () => {
  const teachers_data = [
    ['Brad Traversy', 'Traversy Media', 'UC29ju8bIPH5as8OGnQzwJyA'],
    ['Shaun Pelling', 'Net Ninja', 'UCW5YeuERMmlnqo4oq8vwUpg'],
    ['John Smilga', 'Coding Addict', 'UCMZFwxv5l-XtKi693qMJptA'],
    [
      'Estefania Cassingena Navone',
      'freeCodeCamp Español',
      'UC1emV4A8liRs9p80CY8ElUQ'
    ]
  ];

  const teachers = teachers_data.map(([name, channel, channel_id]) => ({
    name,
    channel,
    channel_id
  }));

  const YOUTUBE_API_KEY = 'AIzaSyDiGGRN0GSfvBgqNx_PHAffoZIKRjLmck0';

  const getYouTubeChannelSubsCount = async channel_id =>
    await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel_id}&key=${YOUTUBE_API_KEY}`
    )
      .then(res => res.json())
      .then(data => data['items'][0].statistics.subscriberCount)
      .catch(err => console.error(err.message));

  const YouTubeChannelsSubsCounts = teachers.map(t =>
    getYouTubeChannelSubsCount(t.channel_id)
  );

  Promise.all(YouTubeChannelsSubsCounts)
    .then(subs => {
      teachers.forEach((teacher, index) => {
        teacher.subs = subs[index];
      });
      
      createRows();
    })
    .catch(err => console.error(err.message));

  const tbody = document.querySelector('tbody');

  const createRows = (array = teachers) => {
    array.forEach(({ name, channel, subs }) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${name}</td>
        <td>${channel}</td>
        <td>${subs}</td>
      `;

      tbody.append(row);
    });
  };

  const removeRows = () => {
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
      row.remove();
    });
  };

  const substituteRows = () => {
    removeRows();
    createRows();
  };

  const sortNamesAZ = array => () => {
    array.sort((a, b) => {
      let prev = a.name.toLowerCase();
      let next = b.name.toLowerCase();

      return prev === next ? 0 : prev > next ? 1 : -1;
    });

    substituteRows();
  };

  const sortNamesZA = array => () => {
    array.sort((a, b) => {
      let prev = a.name.toLowerCase();
      let next = b.name.toLowerCase();

      return next.localeCompare(prev);
    });

    substituteRows();
  };

  const sortTeachersNamesAZ = sortNamesAZ(teachers);
  const sortTeachersNamesZA = sortNamesZA(teachers);

  // 'Click' event

  document
    .querySelector('.name-down-arrow')
    .addEventListener('click', sortTeachersNamesAZ);

  document
    .querySelector('.name-up-arrow')
    .addEventListener('click', sortTeachersNamesZA);

  const sortSubsAscend = array => () => {
    array.sort((prev, next) => prev.subs - next.subs);

    substituteRows();
  };

  const sortSubsDescend = array => () => {
    array.sort((prev, next) => next.subs - prev.subs);

    substituteRows();
  };

  const sortTeachersSubsAscend = sortSubsAscend(teachers);
  const sortTeachersSubsDescend = sortSubsDescend(teachers);

  document
    .querySelector('.subs-down-arrow')
    .addEventListener('click', sortTeachersSubsAscend);

  document
    .querySelector('.subs-up-arrow')
    .addEventListener('click', sortTeachersSubsDescend);

  // DOM

  // Once the HTML document is loaded in the browser, the browser creates an object which models this document, and this object is called the document object. Programmatically, the document seen on the web page is modelled by this document object created by the browser, and inside our JavaScript code we have access to that document object and we can use it to interact with our HTML pages using document object's properties and methods

  // Tree of nodes

  // The DOM sees our HTML page as hierarchical tree of nodes with html tag (root node) at the top (root) of the page, and everything else is inside it. Each one of the elements is considered a node in the DOM, and some of the messageInput nodes have text nodes inside. The idea is that if we want to interact with a web page, we'd use the DOM to reach into this tree of nodes, select a particular messageInput (node) and get a reference to it, and this action is known as querying the DOM

  // Querying & traversing

  console.log(tbody.nodeType);
  console.log(tbody.nodeName);
  console.log(tbody.children);
  console.log(tbody.childNodes);
  console.log(tbody.hasChildNodes());
  console.log(tbody.cloneNode());
  console.log(tbody.cloneNode(true));
  console.log(tbody.previousElementSibling);
  console.log(tbody.parentElement);
  console.log(tbody.parentNode);
  console.log(tbody.offsetParent);
  console.log(tbody.parentElement.parentElement);
  console.log(
    tbody.parentElement.parentElement.parentElement.parentElement
      .firstElementChild
  );

  // Setting, removing, and manipulating attributes

  tbody.id = 't-body';
  tbody.setAttribute('class', 'table-body');
  tbody.dataset.tbodyName = 'table-body-name';

  console.log(tbody.hasAttribute('id'));
  console.log(tbody.hasAttribute('class'));
  console.log(tbody.getAttribute('class'));
  console.log(tbody.getAttribute('data-tbody-name'));

  console.log(tbody);

  tbody.removeAttribute('id');

  tbody.classList.toggle('table-body', false);
  tbody.classList.toggle('table-body', true);
  tbody.style.backgroundColor = 'hsla(120, 95%, 95%, 0.35)';
  tbody.style.fontSize = '1.62rem';

  console.log(tbody);

  tbody.parentNode.previousElementSibling.innerHTML += ` =)<br/><span>Too cool for everyone else!!</span><span>!</span>`;

  const spanToRemove = tbody.parentNode.previousElementSibling.lastElementChild;

  console.log(spanToRemove);

  spanToRemove.parentNode.removeChild(spanToRemove);

  const triggers = document.querySelectorAll('.triggered');

  // Event bubbling

  triggers.forEach(trigger =>
    trigger.addEventListener('click', () => console.log(trigger))
  );

  // Event capturing

  triggers.forEach(trigger =>
    trigger.addEventListener('click', () => console.log(trigger), {
      capture: true
    })
  );

  const list = document.querySelector('.book-list');

  // Event target

  const showMessage = e => {
    const message = document.createElement('p');

    message.textContent = `Book "${e.target.previousElementSibling.textContent}" has been successfully removed from the list.`;

    list.append(message);

    setTimeout(() => {
      message.remove();
    }, 3500);
  };

  const deleteListItemWithNotification = e => {
    if (e.target.className === 'delete triggered') {
      const li = e.target.parentElement;

      list.removeChild(li);

      showMessage(e);
    }
  };

  list.addEventListener('click', e => deleteListItemWithNotification(e));

  // Form events

  // 'Keyup' event

  // The 'keyup' event is fired when a key is released

  const searchBar = document.forms['search-books'].querySelector('input');

  const searchBooks = e => {
    const term = e.target.value.toLowerCase();
    const books = list.querySelectorAll('li');

    books.forEach(book => {
      const title = book.firstElementChild.textContent;

      title.toLowerCase().startsWith(term)
        ? (book.style.display = 'flex')
        : (book.style.display = 'none');
    });
  };

  searchBar.addEventListener('keyup', e => searchBooks(e));

  // 'Submit' event

  const addForm = document.forms['add-book'];

  const capitalizeFirstLetterOfEachWord = value =>
    value
      .split(' ')
      .map(([first, ...rest]) => first.toUpperCase() + rest.join(''))
      .join(' ');

  const addBook = e => {
    e.preventDefault();

    const value = addForm.querySelector('input[type="text"]').value;

    if (value !== '') {
      const li = document.createElement('li');

      li.innerHTML = `
			  <h3>${capitalizeFirstLetterOfEachWord(value)}</h3>
			  <button class="delete triggered">delete</button>
			`;

      li.classList.add('book-item', 'triggered');

      list.appendChild(li);

      addForm.querySelector('input[type="text"]').value = '';
    }
  };

  addForm.addEventListener('submit', e => addBook(e));

  // 'Change' event

  const hideBox = document.querySelector('#hide');

  hideBox.addEventListener('change', () =>
    hideBox.checked
      ? (list.style.display = 'none')
      : (list.style.display = 'initial')
  );

  // 'Keydown' event

  // The keydown event is fired when a key is pressed

  const messageInput = document.querySelector('.message input');
  const message = document.querySelector('.result');

  const capitalizeFirstLetter = value =>
    value.charAt(0).toUpperCase() + value.slice(1);

  const writeAndLogAMessage = e => {
    const value = e.target.value;

    if (e.key === 'Enter' && value.length > 0) {
      message.textContent = `Your message is "
        ${capitalizeFirstLetter(value)}"`;

      e.target.value = '';
    }
  };

  messageInput.addEventListener('keydown', e => writeAndLogAMessage(e));

  // 'Focusout' event

  const removeMessage = () => (message.textContent = '');

  document.addEventListener('focusout', removeMessage);

  const tabs = document.querySelector('#tabs');

  const toggleTabsAndPanels = e => {
    const panels = document.querySelectorAll('.panel');

    if (e.target.tagName === 'LI') {
      const targetPanel = document.querySelector(e.target.dataset.name);

      panels.forEach(panel => {
        if (panel === targetPanel) {
          panel.classList.add('active');
          e.target.classList.remove('inactive');
          e.target.nextElementSibling?.classList.add('inactive');
          e.target.previousElementSibling?.classList.add('inactive');
        } else {
          panel.classList.remove('active');
        }
      });
    }
  };

  tabs.addEventListener('click', e => toggleTabsAndPanels(e));

  // Preventing link default behavior

  const preventLinkDefaultBehaviorWithNotification = e => {
    e.preventDefault();

    const message = document.createElement('p');

    message.textContent = `Navigation to ${e.target.textContent} was prevented.`;

    document.querySelector('footer').append(message);

    setTimeout(() => {
      message.remove();
    }, 3500);
  };

  const createLink = (url, text) => {
    const link = document.createElement('a');

    link.innerHTML = `
  <a href=${url}>${text}</a>
  `;

    return link;
  };

  const linkToMyGitLab = createLink(
    `https://gitlab.com/mi.podgurska`,
    `Mila's GitLab`
  );

  document
    .querySelector('footer')
    .insertAdjacentElement('beforeend', linkToMyGitLab);

  linkToMyGitLab.addEventListener('click', e =>
    preventLinkDefaultBehaviorWithNotification(e)
  );

  // 'Scroll' event

  document.addEventListener('scroll', e => console.log(e, 'I scrolled'), {
    once: true
  });
});
