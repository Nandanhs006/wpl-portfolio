// Small UI behaviors for the portfolio
document.addEventListener('DOMContentLoaded',function(){
	// Nav toggle for small screens (sidebar)
	const navToggle = document.getElementById('nav-toggle');
	const sidebar = document.getElementById('sidebar');
	navToggle && sidebar && navToggle.addEventListener('click', ()=>{
		sidebar.classList.toggle('open');
	});

	// Smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click',e=>{
			const href = a.getAttribute('href');
			if(href.length>1 && href.startsWith('#')){
				e.preventDefault();
				const target = document.querySelector(href);
				if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
				// close sidebar on mobile
				if(sidebar && sidebar.classList.contains('open')) sidebar.classList.remove('open');
			}
		});
	});

	// close sidebar when clicking outside (useful on small screens)
	document.addEventListener('click', e=>{
		if(!sidebar) return;
		if(!sidebar.classList.contains('open')) return;
		const target = e.target;
		if(target === navToggle) return;
		if(!sidebar.contains(target)) sidebar.classList.remove('open');
	});

	// Contact form demo handler
	const form = document.getElementById('contact-form');
	const msg = document.getElementById('form-msg');
	if(form){
		form.addEventListener('submit',e=>{
			e.preventDefault();
			msg.textContent = 'Thanks! Message sent (demo).';
			form.reset();
			setTimeout(()=>msg.textContent = '',4000);
		});
	}

	// Year in footer
	const year = document.getElementById('year');
	if(year) year.textContent = new Date().getFullYear();

	/* Subtle gliding orb cursor (desktop only) */
	try{
		if(window.matchMedia && window.matchMedia('(pointer:fine)').matches){
			const orb = document.getElementById('cursorGlide');
			if(orb){
				let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
				let orbX = mouseX, orbY = mouseY;
				const lerp = 0.14; // smoothness

				document.addEventListener('mousemove', e=>{
					mouseX = e.clientX; mouseY = e.clientY;
				});

				function animateOrb(){
					orbX += (mouseX - orbX) * lerp;
					orbY += (mouseY - orbY) * lerp;
					orb.style.left = orbX + 'px';
					orb.style.top = orbY + 'px';
					requestAnimationFrame(animateOrb);
				}
				requestAnimationFrame(animateOrb);

				// hover interactive elements
				const hoverEls = document.querySelectorAll('a, .btn, button, .card, .skill');
				hoverEls.forEach(el=>{
					el.addEventListener('mouseenter', ()=> document.body.classList.add('cursor-hover'));
					el.addEventListener('mouseleave', ()=> document.body.classList.remove('cursor-hover'));
				});

				// active (mouse down/up) feedback
				document.addEventListener('mousedown', ()=> document.body.classList.add('cursor-active'));
				document.addEventListener('mouseup', ()=> document.body.classList.remove('cursor-active'));
			}
		}
	}catch(err){ console.warn('Glide cursor not available', err); }

		// Sidebar collapse / persist state
		try{
			const collapseToggle = document.getElementById('collapse-toggle');
			const openHandle = document.getElementById('sidebar-open-handle');
			const bodyEl = document.body;
			const KEY = 'sidebarCollapsed';

			// restore state
			if(localStorage.getItem(KEY) === '1'){
				bodyEl.classList.add('sidebar-collapsed');
				if(collapseToggle) collapseToggle.setAttribute('aria-expanded','false');
			}

			collapseToggle && collapseToggle.addEventListener('click', ()=>{
				const collapsed = bodyEl.classList.toggle('sidebar-collapsed');
				collapseToggle.setAttribute('aria-expanded', (!collapsed).toString());
				localStorage.setItem(KEY, collapsed ? '1' : '0');
			});

			openHandle && openHandle.addEventListener('click', ()=>{
				bodyEl.classList.remove('sidebar-collapsed');
				if(collapseToggle) collapseToggle.setAttribute('aria-expanded','true');
				localStorage.setItem(KEY,'0');
			});
		}catch(e){console.warn('Sidebar collapse unavailable', e)}
});