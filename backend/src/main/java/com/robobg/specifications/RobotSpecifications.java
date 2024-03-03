package com.robobg.specifications;

import com.robobg.entity.Robot;
import org.springframework.data.jpa.domain.Specification;

public class RobotSpecifications {
    public  static Specification<Robot> hasModel(String model) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("model"), "%" + model + "%");
    }

    public  static Specification<Robot> hasBrand(String brand) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("brand"), brand);
    }

}
