(function () {

  const thing_to_build = [ 
    "Create an api",
    "Build a web app",
    "Create a service",
    "Write a library",
    "Create a cli tool",
    "Do something using AI",
    "Create an api",
    "Build a web app",
    "Create a service",
    "Write a library",
    "Create a cli tool",
    "Do something using AI",
  ];

  const theme_to_build = [
    "Movies",
    "Books",
    "Paul Craig",
    "Music",
    "Food",
    "Games",
    "Hackathons",
    "Goats",
    "Holidays",
    "The weather",
    "Beavers",
    "The moon",
    "The 80s",
    "The 90s",
    "Analog",
    "Boardgames",
    "Art",
    "A cartoon from your childhood",
    "SPAAACE, https://youtu.be/niZpcdp2v34?t=13",
  ];

  const cds_thing_to_use = [ 
    "Forms",
    "Notify",
    "Notify",
    "Forms",
    "Notify",
    "The design system"
  ];

  const thing = document.querySelector('#thing');
  const theme = document.querySelector('#theme');
  const cds = document.querySelector('#cds');
  const doors = [thing, theme, cds];

  document.querySelector('#spinner').addEventListener('click', spin);
  document.querySelector('#reseter').addEventListener('click', init);

  function initOne(firstInit, groups, duration, door, listOfThings) { 
      if (firstInit) {
        door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
        return;
      }

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      const pool = ['❓'];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...listOfThings);
        }
        pool.push(...shuffle(arr));

        boxesClone.addEventListener(
          'transitionstart',
          function () {
            door.dataset.spinned = '1';
            this.querySelectorAll('.box').forEach((box) => {
              box.style.filter = 'blur(1px)';
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          'transitionend',
          function () {
            this.querySelectorAll('.box').forEach((box, index) => {
              box.style.filter = 'blur(0)';
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
  }


  function init(firstInit = true, duration = 1) {
    initOne(firstInit, 1, duration, thing, thing_to_build);
    initOne(firstInit, 1, duration, theme, theme_to_build);
    initOne(firstInit, 4, duration, cds, cds_thing_to_use);
  }

  async function spin() {
    init(false, 2);
    
    for (const door of doors) {
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();