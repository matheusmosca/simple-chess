export function calculateBoardSize() {
    const width = window.innerWidth
    const height = window.innerHeight
    const boardSide = width > height ? height / 1.1 : width / 1.1;

    const boardElement = document.querySelector('.board') as HTMLElement;
    boardElement.style.width = `${boardSide}px`;
    boardElement.style.height = `${boardSide}px`;

    const flexContainer = document.querySelector('.flex-container') as HTMLElement;
    flexContainer.style.width = `${boardSide}px`;
    flexContainer.style.height = `${boardSide/12}px`;
}
