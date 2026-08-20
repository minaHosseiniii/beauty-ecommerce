-- ============================================================
-- PRODUCTS
-- ============================================================

DELETE FROM products;

INSERT INTO products
(name, description, price, popularity, image_url, created_by)
VALUES
    ('Rose Hydrating Toner',
     'Refreshing rose water toner that hydrates and balances skin.',
     18.99, 95, 'images/rose-hydrating-toner.jpg', 'system'),

    ('Vitamin C Brightening Serum',
     'Powerful serum that improves skin radiance and reduces dark spots.',
     34.99, 100, 'images/vitamin-c-serum.jpg', 'system'),

    ('Hyaluronic Acid Serum',
     'Deep hydration serum for soft and plump skin.',
     29.99, 98, 'images/hyaluronic-serum.jpg', 'system'),

    ('Aloe Vera Soothing Gel',
     'Cooling gel that calms irritated and sensitive skin.',
     16.99, 90, 'images/aloe-vera-gel.jpg', 'system'),

    ('Green Tea Face Cleanser',
     'Gentle cleanser infused with antioxidant green tea.',
     22.99, 92, 'images/green-tea-cleanser.jpg', 'system'),

    ('Charcoal Detox Mask',
     'Purifying mask that removes excess oil and impurities.',
     24.99, 88, 'images/charcoal-mask.jpg', 'system'),

    ('Lavender Night Cream',
     'Nourishing night cream enriched with calming lavender.',
     32.99, 91, 'images/lavender-night-cream.jpg', 'system'),

    ('Collagen Anti-Aging Cream',
     'Improves skin elasticity and reduces fine lines.',
     39.99, 97, 'images/collagen-cream.jpg', 'system'),

    ('Coconut Body Butter',
     'Deep moisturizing body butter with coconut extracts.',
     19.99, 85, 'images/coconut-body-butter.jpg', 'system'),

    ('Shea Hand Cream',
     'Rich hand cream that softens and protects dry hands.',
     14.99, 83, 'images/shea-hand-cream.jpg', 'system'),

    ('Argan Hair Oil',
     'Lightweight oil that nourishes and adds shine to hair.',
     26.99, 94, 'images/argan-hair-oil.jpg', 'system'),

    ('Keratin Repair Shampoo',
     'Strengthening shampoo for damaged hair.',
     21.99, 90, 'images/keratin-shampoo.jpg', 'system'),

    ('Keratin Repair Conditioner',
     'Nourishing conditioner for silky and healthy hair.',
     21.99, 88, 'images/keratin-conditioner.jpg', 'system');


-- ============================================================
-- ROLES
-- ============================================================
DELETE FROM role_permission;
DELETE FROM customer_role;

DELETE FROM permissions;
DELETE FROM roles;

INSERT INTO roles
(role_name, created_at, created_by)
SELECT 'ROLE_USER', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM roles
    WHERE role_name = 'ROLE_USER'
);

INSERT INTO roles
(role_name, created_at, created_by)
SELECT 'ROLE_ADMIN', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM roles
    WHERE role_name = 'ROLE_ADMIN'
);

INSERT INTO roles
(role_name, created_at, created_by)
SELECT 'ROLE_MANAGER', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM roles
    WHERE role_name = 'ROLE_MANAGER'
);


-- ============================================================
-- PERMISSIONS
-- ============================================================

INSERT INTO permissions
(permission_name, created_at, created_by)
SELECT 'PRODUCT_READ', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM permissions
    WHERE permission_name = 'PRODUCT_READ'
);

INSERT INTO permissions
(permission_name, created_at, created_by)
SELECT 'PRODUCT_CREATE', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM permissions
    WHERE permission_name = 'PRODUCT_CREATE'
);

INSERT INTO permissions
(permission_name, created_at, created_by)
SELECT 'PRODUCT_UPDATE', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM permissions
    WHERE permission_name = 'PRODUCT_UPDATE'
);

INSERT INTO permissions
(permission_name, created_at, created_by)
SELECT 'PRODUCT_DELETE', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM permissions
    WHERE permission_name = 'PRODUCT_DELETE'
);

INSERT INTO permissions
(permission_name, created_at, created_by)
SELECT 'PROFILE_READ', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM permissions
    WHERE permission_name = 'PROFILE_READ'
);

INSERT INTO permissions
(permission_name, created_at, created_by)
SELECT 'PROFILE_UPDATE', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM permissions
    WHERE permission_name = 'PROFILE_UPDATE'
);

INSERT INTO permissions
(permission_name, created_at, created_by)
SELECT 'ADDRESS_CREATE', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM permissions
    WHERE permission_name = 'ADDRESS_CREATE'
);

INSERT INTO permissions
(permission_name, created_at, created_by)
SELECT 'ADDRESS_UPDATE', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM permissions
    WHERE permission_name = 'ADDRESS_UPDATE'
);

INSERT INTO permissions
(permission_name, created_at, created_by)
SELECT 'ADDRESS_DELETE', CURRENT_TIMESTAMP, 'system'
    WHERE NOT EXISTS (
    SELECT 1
    FROM permissions
    WHERE permission_name = 'ADDRESS_DELETE'
);


-- ============================================================
-- ROLE -> PERMISSION
-- ============================================================

-- USER permissions

INSERT INTO role_permission (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM roles r
         JOIN permissions p
WHERE r.role_name = 'ROLE_USER'
  AND p.permission_name IN (
                            'PRODUCT_READ',
                            'PROFILE_READ',
                            'PROFILE_UPDATE',
                            'ADDRESS_CREATE',
                            'ADDRESS_UPDATE',
                            'ADDRESS_DELETE'
    )
  AND NOT EXISTS (
    SELECT 1
    FROM role_permission rp
    WHERE rp.role_id = r.role_id
      AND rp.permission_id = p.permission_id
);


-- MANAGER permissions

INSERT INTO role_permission (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM roles r
         JOIN permissions p
WHERE r.role_name = 'ROLE_MANAGER'
  AND p.permission_name IN (
                            'PRODUCT_READ',
                            'PRODUCT_CREATE',
                            'PRODUCT_UPDATE'
    )
  AND NOT EXISTS (
    SELECT 1
    FROM role_permission rp
    WHERE rp.role_id = r.role_id
      AND rp.permission_id = p.permission_id
);


-- ADMIN permissions

INSERT INTO role_permission (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM roles r
         JOIN permissions p
WHERE r.role_name = 'ROLE_ADMIN'
  AND p.permission_name IN (
                            'PRODUCT_READ',
                            'PRODUCT_CREATE',
                            'PRODUCT_UPDATE',
                            'PRODUCT_DELETE',
                            'PROFILE_READ',
                            'PROFILE_UPDATE',
                            'ADDRESS_CREATE',
                            'ADDRESS_UPDATE',
                            'ADDRESS_DELETE'
    )
  AND NOT EXISTS (
    SELECT 1
    FROM role_permission rp
    WHERE rp.role_id = r.role_id
      AND rp.permission_id = p.permission_id
);