interface MdastNode {
  type: string;
  value?: string;
  children?: MdastNode[];
  data?: {
    hProperties?: Record<string, unknown>;
  };
}

const traverse = (node: MdastNode): void => {
  if (node.type === 'math' || node.type === 'inlineMath') {
    const existingData = node.data ?? {};
    const existingProps = (existingData.hProperties ?? {}) as Record<string, unknown>;

    node.data = {
      ...existingData,
      hProperties: {
        ...existingProps,
        'data-latex': node.value ?? '',
      },
    };
  }

  if (node.children) {
    node.children.forEach(traverse);
  }
};

export const attachLatexData = () => (tree: MdastNode): void => {
  traverse(tree);
};
