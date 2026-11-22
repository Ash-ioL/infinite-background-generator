const containers = document.getElementsByClassName('radio-group');
for (let i = 0; i < containers.length; i++) {
    let container = containers[i];
    const searchInput = container.querySelector('input[type="search"]');
    searchInput.addEventListener('input', (event) => {
        const searchValue = searchInput.value.toLowerCase();
        const labels = container.querySelectorAll('label.radio-option');
        labels.forEach((option) => {
            const labelText = option.textContent?.toLowerCase() || '';
            if (labelText.includes(searchValue) || searchValue === '') {
                option.style.display = '';
            }
            else {
                option.style.display = 'none';
            }
        });
    });
}
export {};
//# sourceMappingURL=search.js.map