function freeze(overlay){
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'flex';
}

function ddang(overlay){
    document.body.style.overflow = 'visible';
    overlay.style.display = 'none';
}