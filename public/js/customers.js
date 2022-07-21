document.querySelectorAll('table tr').forEach((row, index) => {
    const children = row.children;
    for(let i = 0; i < children.length; i++) {
        children[i].style.transition = `opacity 0.3s ease-in ${index * 100}ms`;
        children[i].style.opacity = 1;
    }
});