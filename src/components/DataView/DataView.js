import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utils'
import { textStyle, GU } from '../../style'
import { useTheme } from '../../theme'
import { Box } from '../../components/Box/Box'
import { Pagination } from '../../components/Pagination/Pagination'
import { useLayout } from '../../components/Layout/Layout'
import { TableView } from './TableView'
import { ListView } from './ListView'

function prepareEntries(entries, from, to, selectedIndexes) {
  return entries.slice(from, to).map((entry, index) => {
    const entryIndex = from + index
    const selected = selectedIndexes.includes(entryIndex)
    return { value: entry || null, index: entryIndex, selected }
  })
}

function prepareFields(fields) {
  return fields.map((fieldFromProps, index, fields) => {
    // Convert non-object fields (e.g. a simple string) into objects
    const field =
      fieldFromProps && fieldFromProps.label
        ? fieldFromProps
        : { label: fieldFromProps }

    // Auto align the last column to the end (right)
    if (!field.align) {
      field.align =
        index === fields.length - 1 && fields.length > 1 ? 'end' : 'start'
    }

    return field
  })
}

function entryChildrenFromChild(child) {
  if (!child) {
    return []
  }
  return Array.isArray(child) ? child : [child]
}

function renderEntries(
  entries,
  { fields, renderEntry, renderEntryActions, renderEntryChild, mode }
) {
  return entries.map(entry => {
    const { value, index, selected } = entry

    let entryNodes = renderEntry(value, index, { selected, mode })

    if (!Array.isArray(entryNodes)) {
      entryNodes = []
    }

    // Create undefined cells too
    while (entryNodes.length < fields.length) {
      entryNodes.push(null)
    }

    return {
      index,
      entryNodes,
      actions: renderEntryActions
        ? renderEntryActions(value, index, { selected, mode })
        : null,
      children: entryChildrenFromChild(
        renderEntryChild
          ? renderEntryChild(value, index, { selected, mode })
          : null
      ),
      selected,
    }
  })
}

function useSelection(entries, selection, onSelectEntries) {
  // Only used if `selection` is not passed via props. The selection supports
  // both a managed and a controlled mode, to provide a better developer
  // experience out of the box.
  const [selectionManaged, setSelectionManaged] = useState([])

  const currentSelection =
    selection === undefined ? selectionManaged : selection

  const updateSelection = useCallback(
    newSelection => {
      // Managed state
      if (selection === undefined) {
        setSelectionManaged(newSelection)
      }

      // Useful to notify, even in managed mode
      onSelectEntries(
        [...newSelection].sort().map(index => entries[index]),
        newSelection
      )
    },
    [selection, onSelectEntries]
  )

  const allSelected = useMemo(() => {
    // none selected
    if (currentSelection.length === 0) {
      return -1
    }
    // all selected
    if (currentSelection.length === entries.length) {
      return 1
    }
    // some selected
    return 0
  }, [entries, currentSelection])

  const toggleEntry = useCallback(
    entryIndex => {
      updateSelection(
        currentSelection.includes(entryIndex)
          ? currentSelection.filter(index => index !== entryIndex)
          : [...currentSelection, entryIndex]
      )
    },
    [updateSelection, currentSelection]
  )

  const selectAll = useCallback(() => {
    updateSelection(
      currentSelection.length === 0 ? entries.map((_, index) => index) : []
    )
  }, [entries, currentSelection, updateSelection])

  return {
    allSelected,
    selectAll,
    toggleEntry,
    selectedIndexes: currentSelection,
  }
}

const DataView = React.memo(function DataView({
  page,
  entries,
  entriesPerPage,
  fields,
  heading,
  onPageChange,
  onSelectEntries,
  renderEntry,
  renderEntryActions,
  renderEntryChild,
  renderSelectionCount,
  mode,
  selection,
  tableRowHeight,
}) {
  if (renderEntryChild && onSelectEntries) {
    throw new Error(
      'A DataView cannot be made selectable if its entries have children. ' +
        'Please use only one of renderEntryChild or onSelectEntries at a time.'
    )
  }

  // Only used if `page` is not passed. The pagination supports both a
  // managed and a controlled mode, to provide a better developer experience
  // out of the box.
  const [pageManaged, setPageManaged] = useState(0)

  const handlePageChange = useCallback(
    newPage => {
      // Managed state
      if (page === undefined) {
        setPageManaged(newPage)
      }

      // Useful to notify, even in managed mode
      onPageChange(newPage)
    },
    [onPageChange, page]
  )

  const selectedPage = page === undefined ? pageManaged : page

  const theme = useTheme()
  const { layoutName } = useLayout()

  const listMode =
    mode === 'list' || (mode !== 'table' && layoutName === 'small')

  const { allSelected, selectAll, toggleEntry, selectedIndexes } = useSelection(
    entries,
    selection,
    onSelectEntries
  )

  const hasAnyActions = Boolean(renderEntryActions)
  const hasAnyChild = Boolean(renderEntryChild)
  const canSelect = Boolean(onSelectEntries)

  const pages = Math.ceil(entries.length / entriesPerPage)

  const displayFrom = entriesPerPage * selectedPage
  const displayTo = displayFrom + entriesPerPage
  const displayedEntries = prepareEntries(
    entries,
    displayFrom,
    displayTo,
    selectedIndexes
  )

  const preparedFields = prepareFields(fields)
  const renderedEntries = renderEntries(displayedEntries, {
    fields,
    renderEntry,
    renderEntryActions,
    renderEntryChild,
    mode: listMode ? 'list' : 'table',
  })

  const alignChildOnField = fields.findIndex(field => field.childStart)

  return (
    <Box padding={false}>
      {heading && (
        <div
          css={`
            padding: ${2 * GU}px ${3 * GU}px;
          `}
        >
          {typeof heading === 'string' ? (
            <h1
              css={`
                margin-bottom: ${2 * GU}px;
                ${textStyle('body2')};
              `}
            >
              {heading}
            </h1>
          ) : (
            heading
          )}
        </div>
      )}

      {listMode ? (
        <ListView
          allSelected={allSelected}
          entries={renderedEntries}
          fields={preparedFields}
          hasAnyChild={hasAnyChild}
          onSelect={toggleEntry}
          onSelectAll={selectAll}
          renderSelectionCount={renderSelectionCount}
          selectable={canSelect}
        />
      ) : (
        <TableView
          alignChildOnField={Math.min(
            Math.max(-1, alignChildOnField),
            fields.length - 1
          )}
          allSelected={allSelected}
          entries={renderedEntries}
          fields={preparedFields}
          hasAnyActions={hasAnyActions}
          hasAnyChild={hasAnyChild}
          onSelect={toggleEntry}
          onSelectAll={selectAll}
          renderSelectionCount={renderSelectionCount}
          rowHeight={tableRowHeight}
          selectable={canSelect}
          selectedCount={selectedIndexes.length}
        />
      )}

      {pages > 1 && (
        <div
          css={`
            border-top: 1px solid ${theme.border};
          `}
        >
          <Pagination
            pages={pages}
            selected={selectedPage}
            onChange={handlePageChange}
            touchMode={layoutName === 'small'}
          />
        </div>
      )}
    </Box>
  )
})

DataView.propTypes = {
  page: PropTypes.number,
  entries: PropTypes.array.isRequired,
  entriesPerPage: PropTypes.number,
  fields: PropTypes.array.isRequired,
  heading: PropTypes.node,
  mode: PropTypes.oneOf(['adaptive', 'table', 'list']),
  onPageChange: PropTypes.func,
  onSelectEntries: PropTypes.func,
  renderEntry: PropTypes.func.isRequired,
  renderEntryActions: PropTypes.func,
  renderEntryChild: PropTypes.func,
  renderSelectionCount: PropTypes.func,
  selection: PropTypes.array,
  tableRowHeight: PropTypes.number,
}

DataView.defaultProps = {
  entriesPerPage: 10,
  mode: 'adaptive',
  onPageChange: noop,
  renderSelectionCount: count => `${count} items selected`,
  tableRowHeight: 8 * GU,
}

export { DataView }
