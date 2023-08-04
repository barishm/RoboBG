public class NestedObject {
    private Object value;

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public NestedObject getNested() {
        return nested;
    }

    public void setNested(NestedObject nested) {
        this.nested = nested;
    }

    private NestedObject nested;

    public NestedObject(Object value, NestedObject nested) {
        this.value = value;
        this.nested = nested;
    }

    // Getters and setters (if needed)
}
