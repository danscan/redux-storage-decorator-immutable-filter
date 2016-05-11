import { fromJS, Map } from 'immutable';

export default (engine, whitelist = [], blacklist = []) => {
  whitelist = whitelist || []; // eslint-disable-line no-param-reassign

  return {
    ...engine,

    save(state) {
      const whitelistIsEmpty = !whitelist.length;
      const blacklistIsEmpty = !blacklist.length;
      const stateIsMap = Map.isMap(state);

      // Create a deep immutable map of state for easy reducing...
      const stateMap = (stateIsMap
          ? fromJS(state.toJS())
          : fromJS(state)
      );

      // Create a state map with whitelist applied...
      const stateMapWithWhitelistApplied = (whitelistIsEmpty && !blacklistIsEmpty
          ? stateMap
          : whitelist.reduce((memo, whitelistedKeyPath) => {
            const whitelistedKeyPathArray = _getKeyPathArray(whitelistedKeyPath);
            const whitelistedKeyStateValue = stateMap.getIn(whitelistedKeyPathArray);

            return (stateMap.hasIn(whitelistedKeyPathArray) || whitelistedKeyStateValue === null
              ? memo.setIn(whitelistedKeyPathArray, whitelistedKeyStateValue)
              : memo
            );
          }, new Map));

      // Create a state map with blacklist and whitelist applied...
      const stateMapWithBlacklistAndWhitelistApplied = blacklist.reduce((memo, blacklistedKeyPath) => {
        const blacklistedKeyPathArray = _getKeyPathArray(blacklistedKeyPath);

        return memo.deleteIn(blacklistedKeyPathArray);
      }, stateMapWithWhitelistApplied);

      // Convert state map with blacklist and whitelist applied to plain
      // js object.
      const saveState = stateMapWithBlacklistAndWhitelistApplied.toJS();
      return engine.save(saveState);
    },
  };
};

// (Private helpers)
function _getKeyPathArray(keyPath) {
  // Support string-type key paths for shallow paths
  if (typeof keyPath === 'string') {
    return [keyPath];
  }

  return keyPath;
}
