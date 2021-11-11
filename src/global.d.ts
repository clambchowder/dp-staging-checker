interface ObjectConstructor {
    entries<TKey extends string, TVal>(o: Record<TKey,TVal>): [TKey, TVal][];
}
