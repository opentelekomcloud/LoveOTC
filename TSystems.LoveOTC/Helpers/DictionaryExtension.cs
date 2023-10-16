namespace TSystems.LoveOTC.Helpers;

/**
 * <remarks>
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 * </remarks>
 */
internal static class DictionaryExtension {
    public static void AddOrReplace<TKey, TValue>(this IDictionary<TKey, TValue> dic, TKey key, TValue value) {
        if (dic.TryAdd(key, value))
            return;

        dic[key] = value;
    }

    public static TValue GetOrSet<TKey, TValue>(this IDictionary<TKey, TValue> dic, TKey key, Func<TValue> fac) {
        if (dic.TryGetValue(key, out var v))
            return v;

        v = fac();
        dic.Add(key, v);
        return v;
    }
}
