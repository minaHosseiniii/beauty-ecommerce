package com.example.beautyecommerce.repository;

import com.example.beautyecommerce.entity.Customer;
import com.example.beautyecommerce.entity.Order;
import com.example.beautyecommerce.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("""
                    select distinct o from Order o
                    left join fetch o.items items
                    left join fetch items.product product
                    where o.id =:orderId
            
            """)
    Optional<Order> findByIdWithItemsAndProducts(@Param("orderId") Long id);

    List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer);
    List<Order> findByOrderStatus(OrderStatus orderStatus);
}
