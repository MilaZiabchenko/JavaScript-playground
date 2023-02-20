// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
const getTodos = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res => showOutput(res))
    .catch(err => console.error(err));
};

// POST REQUEST
const addTodo = () => {
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo',
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
};

// PUT/PATCH REQUEST
const updateTodo = () => {
  axios
    // .put('https://jsonplaceholder.typicode.com/todos/1', {
    .patch('https://jsonplaceholder.typicode.com/todos/1', {
      title: 'Updated Todo',
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
};

// DELETE REQUEST
const removeTodo = () => {
  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.error(err));
};

// MULTIPLE CONCURRENT REQUESTS
const URLs = [
  'https://jsonplaceholder.typicode.com/todos?_limit=3',
  'https://jsonplaceholder.typicode.com/posts?_limit=5'
];

const getXTodos = () => {
  return axios.get(URLs[0]);
};

const getXPosts = () => {
  return axios.get(URLs[1]);
};

Promise.all([getXTodos(), getXPosts()])
  .then(results => {
    console.log(results);

    const todos = results[0];

    console.log(todos);

    const posts = results[1];

    console.log(posts);
  })
  .catch(err => console.error(err));

const fetchData = URL => {
  return axios
    .get(URL)
    .then(res => res)
    .catch(err => console.error(err));
};

const getAllData = URLs => {
  return Promise.all(URLs.map(fetchData));
};

getAllData(URLs)
  .then(res => {
    console.log(res);

    res.forEach(response => console.log(response));

    const allData = res
      .map(response => response.data)
      .reduce((acc, cur) => acc.concat(cur), []);

    console.log(allData);
  })
  .catch(err => console.error(err));

// TRANSFORMING REQUESTS & RESPONSES
const transformResponse = () => {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/posts',
    data: {
      title: 'Hello, Leo!'
    },

    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
};

// AXIOS INSTANCES
const createInstance = () => {
  const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000
  });

  // instance.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

  instance
    .get('/comments', {
      timeout: 3000,
      params: {
        _limit: 10
      }
    })
    .then(res => showOutput(res));
};

// CUSTOM HEADERS
const configureHeaders = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'some_token'
    }
  };

  axios
    .post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title: `Don't worry, be happy =)`,
        completed: false
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
};

// ERROR HANDLING
const handleError = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/todoss', {
      validateStatus: status => status !== 404
    })
    .then(res => showOutput(res))
    .catch(err => {
      doNotShow();

      if (err.response) {
        console.error(err.response);
      }

      if (err.request) {
        console.error(err.request);
      }

      console.error(err.config);
      console.error('Error', err.message);
    });
};

// CANCELLATION
const cancelRequest = () => {
  const controller = new AbortController();

  axios
    .get(URLs[0], {
      signal: controller.signal
    })
    .then(res => showOutput(res))
    .catch(err => console.error('Error', err.message));

  controller.abort();
  doNotShow();
};

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date()}`
    );

    return config;
  },
  err => Promise.reject(err)
);

const showOutput = res => {
  document.getElementById('res').style.visibility = 'visible';
  document.getElementById('res').innerHTML = `
  <div class="card mb-4">
    <h5>Status: ${res.status}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
};

const doNotShow = () => {
  document.getElementById('res').style.visibility = 'hidden';
};

document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('instance').addEventListener('click', createInstance);
document.getElementById('headers').addEventListener('click', configureHeaders);
document.getElementById('error').addEventListener('click', handleError);
document.getElementById('cancel').addEventListener('click', cancelRequest);
