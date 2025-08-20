import React, { Suspense, useState } from 'react';
import { useLoaderData, useLocation, Await } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import PlayerProfiles from '../components/PlayerProfiles';
import LoadingSpinner from '../components/LoadingSpinner';

const PlayerProfilesPage = ({ pagetitle }) => {
  const { allplayerprofiles } = useLoaderData(); // ← this is a Promise
  const location = useLocation();
  const { category, list } = location.state || {};

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    singleCheckFilters: [
      {
        label: 'Starred Players',
        checked: false,
        onChange: (e) => handleSingleCheckFilterChange(e, 'star'),
      },
    ],
    multiSelectFilters: [
      // Your filters (specialities, position A/B, etc.)
    ],
    dualRangeSliderFilters: [
      {
        label: 'overall',
        min: 0,
        max: 100,
        range: [0, 100],
        onRangeChange: (range) => handleDualRangeSliderFilterChange(range, 'overall'),
      },
    ],
  });

  const handleSingleCheckFilterChange = (event, type) => {
    const updated = [...filters.singleCheckFilters];
    updated[0].checked = event.target.checked;
    setFilters({ ...filters, singleCheckFilters: updated });
  };

  const handleMultiSelectFilterChange = (type, selectedValues) => {
    const updated = [...filters.multiSelectFilters];
    const idx = updated.findIndex((f) => f.label.toLowerCase() === type);
    updated[idx].selectedValues = selectedValues;
    setFilters({ ...filters, multiSelectFilters: updated });
  };

  const handleDualRangeSliderFilterChange = (range, type) => {
    const updated = [...filters.dualRangeSliderFilters];
    const idx = updated.findIndex((f) => f.label.toLowerCase() === type);
    updated[idx].range = range;
    setFilters({ ...filters, dualRangeSliderFilters: updated });
  };

  const compareSubStrings = (entry, compStrs) => {
    const lcEntry = entry.toLowerCase();
    return compStrs.some((str) => str.toLowerCase().startsWith(lcEntry));
  };

  const searchFilter = (profiles) => {
    return profiles.filter((profile) =>
      !search || compareSubStrings(search, [profile.first, profile.last, profile.team])
    );
  };

  const applyFilters = (profiles) => {
    let result = [...profiles];

    // Single check filter
    if (filters.singleCheckFilters[0].checked) {
      result = result.filter((p) => p.star);
    }

    // Multi-select filters
    filters.multiSelectFilters.forEach((filter) => {
      if (filter.selectedValues.length > 0) {
        result = result.filter((profile) => {
          const key = filter.label.split(" ")[0].toLowerCase();
          const attrList = key === "position" ? profile[key]?.preferred || [] : profile[key] || [];

          const selected = filter.options.filter((opt) =>
            filter.selectedValues.includes(opt.value)
          );
          const selectables = selected.flatMap((s) => s.map).map((s) => s.toLowerCase());

          return attrList?.some((attr) => selectables.includes(attr.toLowerCase()));
        });
      }
    });

    // Dual range filter
    filters.dualRangeSliderFilters.forEach((filter) => {
      result = result.filter((p) =>
        filter.range[0] <= p.overall && p.overall <= filter.range[1]
      );
    });

    return result;
  };

  const pagetitleFinal = category || pagetitle || "All Players";

  return (
    <>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <Filter filters={filters} setFilters={setFilters} />
      <Suspense fallback={<LoadingSpinner message="Loading all players..." />}>
        <Await
          resolve={allplayerprofiles}
          errorElement={<p className="text-red-500 text-center">Failed to load players.</p>}
        >
          {(resolvedProfiles) => {
            const baseProfiles = list || resolvedProfiles;
            const filtered = searchFilter(applyFilters(baseProfiles));
            return <PlayerProfiles playerprofiles={filtered} title={pagetitleFinal} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default PlayerProfilesPage;
