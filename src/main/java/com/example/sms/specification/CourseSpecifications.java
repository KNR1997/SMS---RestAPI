package com.example.sms.specification;

import com.example.sms.entity.Course;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CourseSpecifications {
    public static Specification<Course> withFilters(Map<String, String> filters) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            filters.forEach((key, value) -> {
                switch (key) {
                    case "grade":
                        predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("grade")), "%" + value + "%"));
                        break;
                    // Add more filters as needed
                }
            });

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
