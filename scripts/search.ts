const containers: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName('radio-group') as HTMLCollectionOf<HTMLElement>;

for (let i = 0; i < containers.length; i++) {
    let container: HTMLElement = containers[i]!;

    const searchInput = container.querySelector('input[type="search"]') as HTMLInputElement;

    searchInput.addEventListener('input', (event) => {
        const searchValue = searchInput.value.toLowerCase();
        const labels = container.querySelectorAll<HTMLLabelElement>('label.radio-option');
        
        labels.forEach((option) => {
            const labelText = option.textContent?.toLowerCase() || '';
            if (labelText.includes(searchValue) || searchValue === '') {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        });
    });
}