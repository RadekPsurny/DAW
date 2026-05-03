const photos = [
  {
    id: "pruhled_bytem",
    title: "Průhled bytem",
    src: "assets/photos/pruhled_bytem.jpg",
    alt: "Průhled přes dveře mezi místnostmi bytu",
    caption: "90 m², 1. patro, 2+1.",
  },
  {
    id: "vetsi_pokoj",
    title: "Velký pokoj",
    src: "assets/photos/vetsi_pokoj.jpg",
    alt: "Velký pokoj s parketami a vysokými okny",
    caption: "První větší neprůchozí pokoj.",
  },
  {
    id: "mensi_pokoj",
    title: "Menší pokoj",
    src: "assets/photos/mensi_pokoj.jpg",
    alt: "Menší pokoj s parketami, dvojicí oken a bílými dveřmi",
    caption: "Druhý menší neprůchozí pokoj.",
  },
  {
    id: "kuchyn",
    title: "Kuchyň",
    src: "assets/photos/kuchyn.jpg",
    alt: "Kuchyň s lednicí, plynovým sporákem a bílou linkou",
    caption: "Kuchyň s lednicí, plynovým sporákem a jednoduchou linkou.",
  },
  {
    id: "chodba",
    title: "Chodba",
    src: "assets/photos/chodba.jpg",
    alt: "Chodba s gaučem, dveřmi a pohledem směrem ke koupelně",
    caption: "Chodba propojuje vstup, pokoje, koupelnu a kuchyň.",
  },
  {
    id: "koupelna",
    title: "Koupelna",
    src: "assets/photos/koupelna.jpg",
    alt: "Koupelna s vanou, sprchovou zástěnou a žebříkovým topením",
    caption: "Koupelna s vanou, zástěnou, umyvadlem a topením.",
  },
  {
    id: "zachod",
    title: "Záchod",
    src: "assets/photos/zachod.jpg",
    alt: "Samostatný záchod se sprchou, umyvadlem a bojlerem",
    caption: "Samostatné WC se sprchovým koutem.",
  },
  {
    id: "pudorys",
    title: "Půdorys",
    src: "assets/photos/pudorys.jpg",
    alt: "Půdorys bytu Novobranská 20",
    caption: "Půdorys",
  },
];

const galleryImage = document.querySelector("#galleryImage");
const galleryCaption = document.querySelector("#galleryCaption");
const gallery = document.querySelector(".gallery");
const tourImage = document.querySelector("#tourImage");
const thumbStrip = document.querySelector(".thumb-strip");
const thumbs = [...document.querySelectorAll(".thumb")];
const hotspots = [...document.querySelectorAll(".hotspot")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxViewport = document.querySelector("#lightboxViewport");
const lightboxClose = document.querySelector("#lightboxClose");

let activeIndex = 0;
const heroPhotoId = "pruhled_bytem";
const tourPhotoIds = new Set(hotspots.map((hotspot) => hotspot.dataset.photoId));

function getPhotoIndex(photoId) {
  const index = photos.findIndex((photo) => photo.id === photoId);
  return index >= 0 ? index : 0;
}

function activePhoto() {
  return photos[activeIndex];
}

function setActivePhoto(nextIndex) {
  activeIndex = (nextIndex + photos.length) % photos.length;
  const photo = activePhoto();

  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  const isHeroPhoto = photo.id === heroPhotoId;
  gallery.classList.toggle("gallery--simple", !isHeroPhoto);
  galleryCaption.textContent = isHeroPhoto ? photo.caption : photo.title;

  if (tourPhotoIds.has(photo.id)) {
    tourImage.src = photo.src;
    tourImage.alt = photo.alt;
  }

  thumbs.forEach((thumb) => {
    const isActive = thumb.dataset.photoId === photo.id;
    thumb.classList.toggle("is-active", isActive);
    thumb.setAttribute("aria-selected", String(isActive));
    if (isActive) {
      const targetLeft = thumb.offsetLeft - (thumbStrip.clientWidth - thumb.clientWidth) / 2;
      thumbStrip.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  });

  hotspots.forEach((hotspot) => {
    hotspot.classList.toggle("is-active", hotspot.dataset.photoId === photo.id);
  });
}

function openLightbox() {
  const photo = activePhoto();
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightbox.hidden = false;
  document.body.classList.add("is-lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("is-lightbox-open");
  galleryImage.focus();
}

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    setActivePhoto(getPhotoIndex(thumb.dataset.photoId));
  });
});

hotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", () => {
    setActivePhoto(getPhotoIndex(hotspot.dataset.photoId));
  });
});

galleryImage.addEventListener("click", openLightbox);

galleryImage.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openLightbox();
  }
});

lightboxClose.addEventListener("click", closeLightbox);

lightboxViewport.addEventListener("click", (event) => {
  if (event.target === lightboxViewport) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});
