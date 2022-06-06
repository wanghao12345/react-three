class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}



class Tree {
    constructor() {
        this.root = null;
    }

    insert (data) {
        const node = new Node(data, null, null);
        if (!this.root) {
            this.root = node;
            return;
        }

        const current = this.root;
        const parent = null;

        while(current) {
            parent = current;
            if (data < parent.data) {
                current = current.left;
                if (!current) {
                    parent.left = node;
                    return;
                }
            } else {
                current = current.right;
                if (!current) {
                    parent.right = node;
                    return;
                }
            }
        }



    }




}