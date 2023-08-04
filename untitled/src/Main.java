public class Main {
    public static void main(String[] args) {
        NestedObject nestedObject = createSampleData();

        // Start the iteration
        iterateNestedObject(nestedObject);
    }

    // Recursive method to iterate through the nested object
    public static void iterateNestedObject(NestedObject nestedObject) {
        if (nestedObject == null) {
            return;
        }

        // Process the current level value
        System.out.println("Value: " + nestedObject.getValue());

        // Recursively iterate through the nested object
        iterateNestedObject(nestedObject.getNested());
    }

    // Utility method to create a sample nested object
    public static NestedObject createSampleData() {
        // Example of a nested structure: {1, {2, {3, {4, null}}}}
        NestedObject nested4 = new NestedObject(4, null);
        NestedObject nested3 = new NestedObject(3, nested4);
        NestedObject nested2 = new NestedObject(2, nested3);
        NestedObject nested1 = new NestedObject(1, nested2);

        return nested1;
    }
}