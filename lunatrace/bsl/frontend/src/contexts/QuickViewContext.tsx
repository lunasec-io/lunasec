/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type QuickViewModeOn = 'vuln' | 'cwe';
type QuickViewModeOff = 'off';
type QuickViewMode = QuickViewModeOff | QuickViewModeOn;

interface QuickViewStateOn {
  mode: QuickViewModeOn;
  id: string;
}

interface QuickViewStateOff {
  mode: QuickViewModeOff;
  id: null;
}

type QuickViewState = QuickViewStateOff | QuickViewStateOn;

interface QuickViewParams {
  state: QuickViewState;
  setState: (newState: QuickViewState) => void;
  isOpen: boolean;
  checkVulnOpen: (id: string) => boolean;
}

const initialState: QuickViewParams = {
  state: {
    mode: 'off',
    id: null,
  },
  setState: (_) => {
    return;
  },
  isOpen: false,
  checkVulnOpen: (_) => false,
};

const QuickViewContext = React.createContext(initialState);

function determineQuickViewMode(modeString: string | null): QuickViewMode {
  if (modeString === 'cwe') {
    return 'cwe';
  }
  if (modeString === 'vuln') {
    return 'vuln';
  }
  return 'off';
}

function initializeStateFromQueryParams(searchParams: URLSearchParams): QuickViewState {
  const mode = determineQuickViewMode(searchParams.get('quick-view-mode'));
  const id = searchParams.get('quick-view-id');

  if (mode === 'off') {
    return {
      mode,
      id: null,
    };
  }

  if (!id) {
    throw new Error('Missing quick view id');
  }

  return {
    mode,
    id,
  };
}

function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<QuickViewState>(initializeStateFromQueryParams(searchParams));

  // Keep state synced with location in case the URL changes on its own (namely from the back button)
  useEffect(() => {
    setState(initializeStateFromQueryParams(searchParams));
  }, [location.search]);

  // callback for components who want to change the quick view , for example when a vuln link is clicked
  // All we do here is update the URL itself, the above useEffect will watch for changes and update this components state
  function setQuickView(newState: QuickViewState) {
    // current url, used so that we keep the base route the same while we change the search params
    const url = new URL(window.location.href);
    if (newState.mode === 'off') {
      // turn off quick view
      if (history.state.idx !== 0) {
        // make sure we didnt come from an outside link or a something weird before we try to use "back"
        // This is a nicer behavior so that if someone opens and closes a quick view, they don't accidentally open it again by hitting back (maybe multiple times)
        // when what they probably want to do is leave the build
        navigate(-1);
      } else {
        // otherwise push a new state on to represent leaving quick view
        // this happens when react routers index is 0, meaning we just loaded the page fresh and we are going to need to increment history to close the quick view
        url.search = '';
        navigate(url);
      }
    } else {
      // set params to the quick view values
      url.search = '';
      url.searchParams.append('quick-view-mode', newState.mode);
      url.searchParams.append('quick-view-id', newState.id);
      navigate(url);
    }
  }

  const open = state.mode !== 'off';

  // helper function for other components to check if their referenced vuln is open
  function checkVulnOpen(vulnId: string): boolean {
    return state.id === vulnId;
  }

  return (
    <QuickViewContext.Provider
      value={{
        state,
        setState: setQuickView,
        isOpen: open,
        checkVulnOpen,
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export { QuickViewProvider, QuickViewContext };
