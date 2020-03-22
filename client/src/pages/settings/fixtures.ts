type ISentence = {
    content: string;
    weight: number;
}

export const previewText: ISentence[] = [
    { content: "Lorem Ipsum is simply dummy text.", weight: 3 },
    { content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", weight: 1 },
    { content: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", weight: 0 },
    { content: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.", weight: 1 },
    { content: "It is a fact that a reader will be distracted by the readable content of a page when looking at its layout.", weight: 0},
    { content: "The point of using Lorem Ipsum is to using 'Content here, content here' principal.", weight: 2}
]

export const MAX_WEIGHT = Math.max(...previewText.map(s1 => s1.weight))