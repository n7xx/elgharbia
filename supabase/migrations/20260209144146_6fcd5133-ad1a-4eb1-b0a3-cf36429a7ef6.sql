
-- Fix overly permissive INSERT policies on orders and order_items
DROP POLICY "Users can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (
  user_id IS NULL OR auth.uid() = user_id
);

DROP POLICY "Users can create order items" ON public.order_items;
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id)
);
