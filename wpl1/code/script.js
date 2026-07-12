document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.getElementById('nav-toggle');
  const sidebar = document.getElementById('sidebar');

  if(navToggle && sidebar){
    navToggle.addEventListener('click', function(){
      sidebar.classList.toggle('open');
    });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      const href = a.getAttribute('href');
      if(href && href.startsWith('#') && href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // contact form demo
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-msg');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(msg) msg.textContent = 'Thanks — message received (demo).';
      form.reset();
      setTimeout(function(){ if(msg) msg.textContent = ''; }, 3000);
    });
  }

  // footer year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();
});
