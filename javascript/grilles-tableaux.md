# 9.2 Grilles et Tableaux Dynamiques

## Introduction aux Grilles et Tableaux Dynamiques

Les grilles et tableaux dynamiques constituent l'épine dorsale de nombreuses applications web modernes, transformant la présentation statique de données en interfaces interactives et personnalisables. Ces composants permettent aux utilisateurs de manipuler, filtrer, trier et organiser de grandes quantités d'informations de manière intuitive et efficace.

L'évolution des besoins utilisateur a poussé le développement web au-delà des simples tableaux HTML statiques vers des solutions sophistiquées offrant des fonctionnalités avancées : tri multi-colonnes, filtrage en temps réel, pagination dynamique, édition inline, redimensionnement de colonnes, et bien plus encore.

La maîtrise de ces techniques est devenue essentielle dans le développement d'applications web professionnelles, particulièrement dans les domaines de la gestion de données, des tableaux de bord analytiques, et des interfaces d'administration. Ces composants doivent allier performance, accessibilité et expérience utilisateur optimale.

## Création de Tableaux Dynamiques

### Architecture de Base pour un Tableau Dynamique

```javascript
class DynamicTable {
    constructor(container, options = {}) {
        this.container = container;
        this.data = [];
        this.filteredData = [];
        this.columns = options.columns || [];
        this.currentPage = 1;
        this.itemsPerPage = options.itemsPerPage || 10;
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.filters = new Map();
        this.selectedRows = new Set();
        
        this.options = {
            sortable: options.sortable !== false,
            filterable: options.filterable !== false,
            selectable: options.selectable !== false,
            editable: options.editable !== false,
            pagination: options.pagination !== false,
            resizable: options.resizable !== false,
            ...options
        };
        
        this.callbacks = {
            onRowSelect: options.onRowSelect || (() => {}),
            onRowEdit: options.onRowEdit || (() => {}),
            onDataChange: options.onDataChange || (() => {}),
            onSort: options.onSort || (() => {}),
            onFilter: options.onFilter || (() => {})
        };
        
        this.initializeTable();
    }

    initializeTable() {
        this.createTableStructure();
        this.setupEventListeners();
        this.render();
    }

    createTableStructure() {
        this.container.innerHTML = `
            <div class="dynamic-table-wrapper">
                <div class="table-controls">
                    <div class="table-search">
                        <input type="text" placeholder="Rechercher..." class="search-input">
                        <button class="search-btn">🔍</button>
                    </div>
                    <div class="table-actions">
                        <button class="btn-add-row">+ Ajouter</button>
                        <button class="btn-export">Exporter</button>
                        <button class="btn-settings">⚙️</button>
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="dynamic-table">
                        <thead class="table-header">
                            <!-- En-têtes générées dynamiquement -->
                        </thead>
                        <tbody class="table-body">
                            <!-- Contenu généré dynamiquement -->
                        </tbody>
                    </table>
                </div>
                
                <div class="table-footer">
                    <div class="pagination-info">
                        <span class="items-info"></span>
                    </div>
                    <div class="pagination-controls">
                        <!-- Contrôles de pagination -->
                    </div>
                </div>
            </div>
        `;

        this.tableElement = this.container.querySelector('.dynamic-table');
        this.headerElement = this.container.querySelector('.table-header');
        this.bodyElement = this.container.querySelector('.table-body');
        this.searchInput = this.container.querySelector('.search-input');
        this.paginationContainer = this.container.querySelector('.pagination-controls');
        this.itemsInfo = this.container.querySelector('.items-info');
    }

    setupEventListeners() {
        // Recherche en temps réel
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Délégation d'événements pour le tableau
        this.tableElement.addEventListener('click', (e) => {
            this.handleTableClick(e);
        });

        // Gestion du redimensionnement des colonnes
        if (this.options.resizable) {
            this.setupColumnResizing();
        }

        // Actions de la barre d'outils
        this.container.querySelector('.btn-add-row').addEventListener('click', () => {
            this.addNewRow();
        });

        this.container.querySelector('.btn-export').addEventListener('click', () => {
            this.exportData();
        });
    }

    setData(data) {
        this.data = [...data];
        this.filteredData = [...data];
        this.currentPage = 1;
        this.render();
        this.callbacks.onDataChange(this.data);
    }

    addData(newData) {
        if (Array.isArray(newData)) {
            this.data.push(...newData);
        } else {
            this.data.push(newData);
        }
        this.applyFiltersAndSort();
        this.render();
        this.callbacks.onDataChange(this.data);
    }

    setColumns(columns) {
        this.columns = columns;
        this.renderHeader();
        this.render();
    }

    renderHeader() {
        const headerRow = document.createElement('tr');
        
        // Colonne de sélection si activée
        if (this.options.selectable) {
            const selectHeader = document.createElement('th');
            selectHeader.innerHTML = `
                <input type="checkbox" class="select-all-checkbox" title="Sélectionner tout">
            `;
            selectHeader.className = 'select-column';
            headerRow.appendChild(selectHeader);
        }

        // Colonnes de données
        this.columns.forEach((column, index) => {
            const th = document.createElement('th');
            th.className = 'table-header-cell';
            th.dataset.columnKey = column.key;
            th.dataset.columnIndex = index;
            
            const headerContent = document.createElement('div');
            headerContent.className = 'header-content';
            
            const title = document.createElement('span');
            title.textContent = column.title || column.key;
            title.className = 'header-title';
            headerContent.appendChild(title);
            
            // Indicateur de tri
            if (this.options.sortable && column.sortable !== false) {
                th.classList.add('sortable');
                const sortIndicator = document.createElement('span');
                sortIndicator.className = 'sort-indicator';
                sortIndicator.innerHTML = '⇅';
                headerContent.appendChild(sortIndicator);
            }
            
            // Filtre de colonne
            if (this.options.filterable && column.filterable !== false) {
                const filterButton = document.createElement('button');
                filterButton.className = 'filter-button';
                filterButton.innerHTML = '🔽';
                filterButton.title = 'Filtrer cette colonne';
                headerContent.appendChild(filterButton);
            }
            
            th.appendChild(headerContent);
            
            // Poignée de redimensionnement
            if (this.options.resizable && column.resizable !== false) {
                const resizeHandle = document.createElement('div');
                resizeHandle.className = 'resize-handle';
                th.appendChild(resizeHandle);
            }
            
            headerRow.appendChild(th);
        });

        // Colonne d'actions si édition activée
        if (this.options.editable) {
            const actionsHeader = document.createElement('th');
            actionsHeader.textContent = 'Actions';
            actionsHeader.className = 'actions-column';
            headerRow.appendChild(actionsHeader);
        }

        this.headerElement.innerHTML = '';
        this.headerElement.appendChild(headerRow);
    }

    render() {
        this.renderHeader();
        this.renderBody();
        this.renderPagination();
        this.updateItemsInfo();
    }

    renderBody() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);
        
        this.bodyElement.innerHTML = '';
        
        if (pageData.length === 0) {
            this.renderEmptyState();
            return;
        }
        
        pageData.forEach((rowData, rowIndex) => {
            const row = this.createTableRow(rowData, startIndex + rowIndex);
            this.bodyElement.appendChild(row);
        });
    }

    createTableRow(rowData, dataIndex) {
        const row = document.createElement('tr');
        row.className = 'table-row';
        row.dataset.rowIndex = dataIndex;
        
        // Gestion de la sélection de ligne
        if (this.selectedRows.has(dataIndex)) {
            row.classList.add('selected');
        }
        
        // Colonne de sélection
        if (this.options.selectable) {
            const selectCell = document.createElement('td');
            selectCell.innerHTML = `
                <input type="checkbox" class="row-checkbox" ${this.selectedRows.has(dataIndex) ? 'checked' : ''}>
            `;
            selectCell.className = 'select-cell';
            row.appendChild(selectCell);
        }
        
        // Cellules de données
        this.columns.forEach(column => {
            const cell = document.createElement('td');
            cell.className = 'table-cell';
            cell.dataset.columnKey = column.key;
            
            const value = this.getCellValue(rowData, column.key);
            const displayValue = this.formatCellValue(value, column);
            
            if (column.editable !== false && this.options.editable) {
                cell.classList.add('editable-cell');
                cell.innerHTML = `
                    <span class="cell-display">${displayValue}</span>
                    <input type="text" class="cell-input" value="${value}" style="display: none;">
                `;
            } else {
                cell.innerHTML = displayValue;
            }
            
            row.appendChild(cell);
        });
        
        // Colonne d'actions
        if (this.options.editable) {
            const actionsCell = document.createElement('td');
            actionsCell.className = 'actions-cell';
            actionsCell.innerHTML = `
                <button class="btn-edit" title="Modifier">✏️</button>
                <button class="btn-delete" title="Supprimer">🗑️</button>
                <button class="btn-save" title="Sauvegarder" style="display: none;">💾</button>
                <button class="btn-cancel" title="Annuler" style="display: none;">❌</button>
            `;
            row.appendChild(actionsCell);
        }
        
        return row;
    }

    getCellValue(rowData, key) {
        // Support des clés imbriquées (ex: "user.profile.name")
        return key.split('.').reduce((obj, prop) => obj && obj[prop], rowData) || '';
    }

    formatCellValue(value, column) {
        if (column.formatter && typeof column.formatter === 'function') {
            return column.formatter(value);
        }
        
        // Formatages par défaut
        if (column.type === 'date' && value) {
            return new Date(value).toLocaleDateString();
        }
        
        if (column.type === 'currency' && typeof value === 'number') {
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
            }).format(value);
        }
        
        if (column.type === 'boolean') {
            return value ? '✓' : '✗';
        }
        
        return value.toString();
    }

    handleTableClick(e) {
        const target = e.target;
        const row = target.closest('tr');
        
        // Gestion du tri par clic sur l'en-tête
        if (target.closest('.sortable')) {
            const columnKey = target.closest('th').dataset.columnKey;
            this.handleSort(columnKey);
            return;
        }
        
        // Gestion de la sélection de lignes
        if (target.classList.contains('row-checkbox')) {
            const rowIndex = parseInt(row.dataset.rowIndex);
            this.toggleRowSelection(rowIndex);
            return;
        }
        
        // Sélection de toutes les lignes
        if (target.classList.contains('select-all-checkbox')) {
            this.toggleAllRowsSelection(target.checked);
            return;
        }
        
        // Actions d'édition
        if (target.classList.contains('btn-edit')) {
            this.startEditingRow(row);
            return;
        }
        
        if (target.classList.contains('btn-save')) {
            this.saveRowEdits(row);
            return;
        }
        
        if (target.classList.contains('btn-cancel')) {
            this.cancelRowEdits(row);
            return;
        }
        
        if (target.classList.contains('btn-delete')) {
            this.deleteRow(row);
            return;
        }
        
        // Édition directe de cellule
        if (target.classList.contains('editable-cell') || target.closest('.editable-cell')) {
            const cell = target.closest('.editable-cell');
            this.startEditingCell(cell);
            return;
        }
    }

    handleSort(columnKey) {
        if (this.sortColumn === columnKey) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = columnKey;
            this.sortDirection = 'asc';
        }
        
        this.applySorting();
        this.updateSortIndicators();
        this.render();
        
        this.callbacks.onSort(this.sortColumn, this.sortDirection);
    }

    applySorting() {
        if (!this.sortColumn) return;
        
        const column = this.columns.find(col => col.key === this.sortColumn);
        
        this.filteredData.sort((a, b) => {
            let aValue = this.getCellValue(a, this.sortColumn);
            let bValue = this.getCellValue(b, this.sortColumn);
            
            // Gestion des types de données
            if (column && column.type === 'number') {
                aValue = parseFloat(aValue) || 0;
                bValue = parseFloat(bValue) || 0;
            } else if (column && column.type === 'date') {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            } else {
                aValue = aValue.toString().toLowerCase();
                bValue = bValue.toString().toLowerCase();
            }
            
            if (aValue < bValue) {
                return this.sortDirection === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return this.sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    updateSortIndicators() {
        // Réinitialiser tous les indicateurs
        this.container.querySelectorAll('.sort-indicator').forEach(indicator => {
            indicator.innerHTML = '⇅';
            indicator.classList.remove('sort-asc', 'sort-desc');
        });
        
        // Mettre à jour l'indicateur actif
        if (this.sortColumn) {
            const headerCell = this.container.querySelector(`[data-column-key="${this.sortColumn}"]`);
            if (headerCell) {
                const indicator = headerCell.querySelector('.sort-indicator');
                if (indicator) {
                    indicator.innerHTML = this.sortDirection === 'asc' ? '↑' : '↓';
                    indicator.classList.add(`sort-${this.sortDirection}`);
                }
            }
        }
    }

    handleSearch(searchTerm) {
        this.filteredData = this.data.filter(row => {
            return this.columns.some(column => {
                const value = this.getCellValue(row, column.key).toString().toLowerCase();
                return value.includes(searchTerm.toLowerCase());
            });
        });
        
        this.currentPage = 1;
        this.applySorting();
        this.render();
        
        this.callbacks.onFilter(searchTerm, this.filteredData);
    }

    toggleRowSelection(rowIndex) {
        if (this.selectedRows.has(rowIndex)) {
            this.selectedRows.delete(rowIndex);
        } else {
            this.selectedRows.add(rowIndex);
        }
        
        this.updateRowSelectionDisplay();
        this.callbacks.onRowSelect(Array.from(this.selectedRows));
    }

    toggleAllRowsSelection(selectAll) {
        if (selectAll) {
            // Sélectionner toutes les lignes visibles
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredData.length);
            
            for (let i = startIndex; i < endIndex; i++) {
                this.selectedRows.add(i);
            }
        } else {
            this.selectedRows.clear();
        }
        
        this.updateRowSelectionDisplay();
        this.callbacks.onRowSelect(Array.from(this.selectedRows));
    }

    updateRowSelectionDisplay() {
        // Mettre à jour les cases à cocher des lignes
        this.container.querySelectorAll('.row-checkbox').forEach((checkbox, index) => {
            const rowIndex = parseInt(checkbox.closest('tr').dataset.rowIndex);
            checkbox.checked = this.selectedRows.has(rowIndex);
        });
        
        // Mettre à jour la case "sélectionner tout"
        const selectAllCheckbox = this.container.querySelector('.select-all-checkbox');
        if (selectAllCheckbox) {
            const visibleRows = this.container.querySelectorAll('.row-checkbox').length;
            const selectedVisibleRows = this.container.querySelectorAll('.row-checkbox:checked').length;
            
            selectAllCheckbox.checked = visibleRows > 0 && selectedVisibleRows === visibleRows;
            selectAllCheckbox.indeterminate = selectedVisibleRows > 0 && selectedVisibleRows < visibleRows;
        }
        
        // Mettre à jour l'affichage des lignes sélectionnées
        this.container.querySelectorAll('.table-row').forEach(row => {
            const rowIndex = parseInt(row.dataset.rowIndex);
            row.classList.toggle('selected', this.selectedRows.has(rowIndex));
        });
    }

    startEditingRow(row) {
        row.classList.add('editing');
        
        // Afficher les champs d'édition
        row.querySelectorAll('.editable-cell').forEach(cell => {
            const display = cell.querySelector('.cell-display');
            const input = cell.querySelector('.cell-input');
            
            if (display && input) {
                display.style.display = 'none';
                input.style.display = 'block';
                input.focus();
            }
        });
        
        // Basculer les boutons d'action
        const editBtn = row.querySelector('.btn-edit');
        const deleteBtn = row.querySelector('.btn-delete');
        const saveBtn = row.querySelector('.btn-save');
        const cancelBtn = row.querySelector('.btn-cancel');
        
        if (editBtn) editBtn.style.display = 'none';
        if (deleteBtn) deleteBtn.style.display = 'none';
        if (saveBtn) saveBtn.style.display = 'inline-block';
        if (cancelBtn) cancelBtn.style.display = 'inline-block';
    }

    saveRowEdits(row) {
        const rowIndex = parseInt(row.dataset.rowIndex);
        const originalData = this.filteredData[rowIndex - (this.currentPage - 1) * this.itemsPerPage];
        const newData = { ...originalData };
        
        // Collecter les nouvelles valeurs
        row.querySelectorAll('.editable-cell').forEach(cell => {
            const columnKey = cell.dataset.columnKey;
            const input = cell.querySelector('.cell-input');
            
            if (input) {
                this.setCellValue(newData, columnKey, input.value);
            }
        });
        
        // Mettre à jour les données
        const dataIndex = this.data.findIndex(item => item === originalData);
        if (dataIndex !== -1) {
            this.data[dataIndex] = newData;
            this.filteredData[rowIndex - (this.currentPage - 1) * this.itemsPerPage] = newData;
        }
        
        this.finishEditingRow(row);
        this.callbacks.onRowEdit(newData, originalData);
    }

    setCellValue(obj, key, value) {
        const keys = key.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, k) => current[k] = current[k] || {}, obj);
        target[lastKey] = value;
    }

    cancelRowEdits(row) {
        // Restaurer les valeurs originales
        row.querySelectorAll('.editable-cell').forEach(cell => {
            const input = cell.querySelector('.cell-input');
            const display = cell.querySelector('.cell-display');
            
            if (input && display) {
                input.value = display.textContent;
            }
        });
        
        this.finishEditingRow(row);
    }

    finishEditingRow(row) {
        row.classList.remove('editing');
        
        // Masquer les champs d'édition
        row.querySelectorAll('.editable-cell').forEach(cell => {
            const display = cell.querySelector('.cell-display');
            const input = cell.querySelector('.cell-input');
            
            if (display && input) {
                display.style.display = 'block';
                input.style.display = 'none';
                
                // Mettre à jour l'affichage avec la nouvelle valeur
                const columnKey = cell.dataset.columnKey;
                const column = this.columns.find(col => col.key === columnKey);
                if (column) {
                    display.textContent = this.formatCellValue(input.value, column);
                }
            }
        });
        
        // Restaurer les boutons d'action
        const editBtn = row.querySelector('.btn-edit');
        const deleteBtn = row.querySelector('.btn-delete');
        const saveBtn = row.querySelector('.btn-save');
        const cancelBtn = row.querySelector('.btn-cancel');
        
        if (editBtn) editBtn.style.display = 'inline-block';
        if (deleteBtn) deleteBtn.style.display = 'inline-block';
        if (saveBtn) saveBtn.style.display = 'none';
        if (cancelBtn) cancelBtn.style.display = 'none';
    }

    deleteRow(row) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette ligne ?')) {
            const rowIndex = parseInt(row.dataset.rowIndex);
            const dataIndex = (this.currentPage - 1) * this.itemsPerPage + 
                Array.from(this.bodyElement.children).indexOf(row);
            
            const deletedData = this.filteredData[dataIndex];
            
            // Supprimer des données principales
            const mainDataIndex = this.data.findIndex(item => item === deletedData);
            if (mainDataIndex !== -1) {
                this.data.splice(mainDataIndex, 1);
            }
            
            // Supprimer des données filtrées
            this.filteredData.splice(dataIndex, 1);
            
            // Supprimer de la sélection
            this.selectedRows.delete(rowIndex);
            
            this.render();
            this.callbacks.onDataChange(this.data);
        }
    }

    addNewRow() {
        const newRow = {};
        this.columns.forEach(column => {
            newRow[column.key] = column.defaultValue || '';
        });
        
        this.data.unshift(newRow);
        this.filteredData.unshift(newRow);
        this.currentPage = 1;
        this.render();
        
        // Démarrer l'édition immédiatement
        setTimeout(() => {
            const firstRow = this.bodyElement.querySelector('.table-row');
            if (firstRow) {
                this.startEditingRow(firstRow);
            }
        }, 100);
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            this.paginationContainer.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Bouton précédent
        paginationHTML += `
            <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}">
                ← Précédent
            </button>
        `;
        
        // Numéros de page
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `<button class="pagination-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
            paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        // Bouton suivant
        paginationHTML += `
            <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}">
                Suivant →
            </button>
        `;
        
        this.paginationContainer.innerHTML = paginationHTML;
        
        // Gestion des événements de pagination
        this.paginationContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('pagination-btn') && !e.target.disabled) {
                const page = parseInt(e.target.dataset.page);
                this.goToPage(page);
            }
        });
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.render();
        }
    }

    updateItemsInfo() {
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
        const totalItems = this.filteredData.length;
        
        this.itemsInfo.textContent = `Affichage de ${startItem} à ${endItem} sur ${totalItems} éléments`;
    }

    renderEmptyState() {
        const emptyRow = document.createElement('tr');
        emptyRow.className = 'empty-state';
        
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = this.getColumnCount();
        emptyCell.innerHTML = `
            <div class="empty-state-content">
                <div class="empty-icon">📄</div>
                <div class="empty-message">Aucune donnée à afficher</div>
                <div class="empty-suggestion">Essayez de modifier vos critères de recherche</div>
            </div>
        `;
        
        emptyRow.appendChild(emptyCell);
        this.bodyElement.appendChild(emptyRow);
    }

    getColumnCount() {
        let count = this.columns.length;
        if (this.options.selectable) count++;
        if (this.options.editable) count++;
        return count;
    }

    exportData(format = 'csv') {
        const dataToExport = this.selectedRows.size > 0 
            ? this.data.filter((_, index) => this.selectedRows.has(index))
            : this.filteredData;
        
        if (format === 'csv') {
            this.exportToCSV(dataToExport);
        } else if (format === 'json') {
            this.exportToJSON(dataToExport);
        }
    }

    exportToCSV(data) {
        const headers = this.columns.map(col => col.title || col.key);
        const csvContent = [
            headers.join(','),
            ...data.map(row => 
                this.columns.map(col => 
                    `"${this.getCellValue(row, col.key).toString().replace(/"/g, '""')}"`
                ).join(',')
            )
        ].join('\n');
        
        this.downloadFile(csvContent, 'tableau-export.csv', 'text/csv');
    }

    exportToJSON(data) {
        const jsonContent = JSON.stringify(data, null, 2);
        this.downloadFile(jsonContent, 'tableau-export.json', 'application/json');
    }

    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Méthodes d'API publique
    getSelectedData() {
        return Array.from(this.selectedRows).map(index => this.data[index]);
    }

    clearSelection() {
        this.selectedRows.clear();
        this.updateRowSelectionDisplay();
    }

    refreshData() {
        this.applyFiltersAndSort();
        this.render();
    }

    applyFiltersAndSort() {
        // Appliquer les filtres
        this.filteredData = [...this.data];
        
        // Appliquer le tri si défini
        if (this.sortColumn) {
            this.applySorting();
        }
    }

    setupColumnResizing() {
        let isResizing = false;
        let startX = 0;
        let startWidth = 0;
        let currentHeader = null;
        
        this.headerElement.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('resize-handle')) {
                isResizing = true;
                startX = e.clientX;
                currentHeader = e.target.parentElement;
                startWidth = currentHeader.offsetWidth;
                
                document.addEventListener('mousemove', handleResize);
                document.addEventListener('mouseup', stopResize);
                
                e.preventDefault();
            }
        });
        
        const handleResize = (e) => {
            if (!isResizing) return;
            
            const width = startWidth + (e.clientX - startX);
            if (width > 50) { // Largeur minimale
                currentHeader.style.width = width + 'px';
            }
        };
        
        const stopResize = () => {
            isResizing = false;
            currentHeader = null;
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', stopResize);
        };
    }
}
```

## Styles CSS pour le Tableau Dynamique

```css
/* Styles pour le tableau dynamique */
.dynamic-table-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.table-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}

.table-search {
    display: flex;
    align-items: center;
    gap: 10px;
}

.search-input {
    padding: 10px 15px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    width: 300px;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-btn {
    padding: 10px 15px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-btn:hover {
    background: #5a6fd8;
}

.table-actions {
    display: flex;
    gap: 10px;
}

.table-actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-add-row {
    background: #28a745;
    color: white;
}

.btn-add-row:hover {
    background: #218838;
    transform: translateY(-2px);
}

.btn-export {
    background: #17a2b8;
    color: white;
}

.btn-export:hover {
    background: #138496;
    transform: translateY(-2px);
}

.btn-settings {
    background: #6c757d;
    color: white;
}

.btn-settings:hover {
    background: #5a6268;
    transform: translateY(-2px);
}

.table-container {
    overflow-x: auto;
    max-height: 600px;
    overflow-y: auto;
}

.dynamic-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.table-header {
    background: #f8f9fa;
    position: sticky;
    top: 0;
    z-index: 10;
}

.table-header-cell {
    padding: 15px 20px;
    text-align: left;
    font-weight: 600;
    color: #495057;
    border-bottom: 2px solid #dee2e6;
    position: relative;
    user-select: none;
}

.table-header-cell.sortable {
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.table-header-cell.sortable:hover {
    background-color: #e9ecef;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-title {
    flex: 1;
}

.sort-indicator {
    margin-left: 8px;
    opacity: 0.5;
    transition: opacity 0.3s ease;
}

.sort-indicator.sort-asc,
.sort-indicator.sort-desc {
    opacity: 1;
    color: #667eea;
}

.filter-button {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.3s ease;
}

.filter-button:hover {
    opacity: 1;
}

.resize-handle {
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
    transition: background-color 0.3s ease;
}

.resize-handle:hover {
    background-color: #667eea;
}

.table-row {
    transition: background-color 0.3s ease;
}

.table-row:hover {
    background-color: #f8f9fa;
}

.table-row.selected {
    background-color: #e3f2fd;
}

.table-row.editing {
    background-color: #fff3cd;
}

.table-cell {
    padding: 12px 20px;
    border-bottom: 1px solid #e9ecef;
    vertical-align: middle;
}

.select-column,
.select-cell {
    width: 50px;
    text-align: center;
}

.actions-column,
.actions-cell {
    width: 120px;
    text-align: center;
}

.editable-cell {
    position: relative;
    cursor: pointer;
}

.editable-cell:hover {
    background-color: #f8f9fa;
}

.cell-input {
    width: 100%;
    padding: 8px;
    border: 2px solid #667eea;
    border-radius: 4px;
    font-size: 14px;
}

.cell-input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.actions-cell button {
    background: none;
    border: none;
    padding: 6px;
    margin: 0 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.btn-edit:hover {
    background-color: #007bff;
    color: white;
}

.btn-delete:hover {
    background-color: #dc3545;
    color: white;
}

.btn-save:hover {
    background-color: #28a745;
    color: white;
}

.btn-cancel:hover {
    background-color: #6c757d;
    color: white;
}

.table-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.pagination-info {
    color: #6c757d;
    font-size: 14px;
}

.pagination-controls {
    display: flex;
    gap: 5px;
}

.pagination-btn {
    padding: 8px 12px;
    border: 1px solid #dee2e6;
    background: white;
    color: #495057;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.pagination-btn:hover:not([disabled]) {
    background-color: #e9ecef;
}

.pagination-btn.active {
    background-color: #667eea;
    color: white;
    border-color: #667eea;
}

.pagination-btn[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-ellipsis {
    padding: 8px 4px;
    color: #6c757d;
}

.empty-state-content {
    text-align: center;
    padding: 60px 20px;
    color: #6c757d;
}

.empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
}

.empty-message {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
}

.empty-suggestion {
    font-size: 14px;
    opacity: 0.8;
}

/* Styles pour les modales */
.field-config-modal,
.preview-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.field-config-modal.show,
.preview-modal.show {
    opacity: 1;
}

.field-config-modal.hiding,
.preview-modal.hiding {
    opacity: 0;
}

.modal-content {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: translateY(-20px);
    transition: transform 0.3s ease;
}

.field-config-modal.show .modal-content,
.preview-modal.show .modal-content {
    transform: translateY(0);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
    margin: 0;
    color: #495057;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6c757d;
    transition: color 0.3s ease;
}

.modal-close:hover {
    color: #495057;
}

.modal-body {
    padding: 20px;
}

.config-field {
    margin-bottom: 20px;
}

.config-field label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #495057;
}

.config-field input,
.config-field textarea {
    width: 100%;
    padding: 10px;
    border: 2px solid #e9ecef;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.config-field input:focus,
.config-field textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px;
    border-top: 1px solid #e9ecef;
}

.modal-footer button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-cancel {
    background: #6c757d;
    color: white;
}

.btn-cancel:hover {
    background: #5a6268;
}

.btn-confirm,
.btn-close {
    background: #667eea;
    color: white;
}

.btn-confirm:hover,
.btn-close:hover {
    background: #5a6fd8;
}

/* Notifications */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 1100;
    transform: translateX(400px);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification.hiding {
    transform: translateX(400px);
}

.notification-success {
    background: #28a745;
}

.notification-error {
    background: #dc3545;
}

.notification-info {
    background: #17a2b8;
}

/* Responsive */
@media (max-width: 768px) {
    .table-controls {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }
    
    .search-input {
        width: 100%;
    }
    
    .table-actions {
        justify-content: center;
    }
    
    .table-footer {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .pagination-controls {
        justify-content: center;
    }
    
    .modal-content {
        width: 95%;
        margin: 20px;
    }
}
```

## Exemple d'Utilisation Complète

```javascript
// Exemple d'utilisation du tableau dynamique
document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('dynamicTableContainer');
    
    // Configuration des colonnes
    const columns = [
        {
            key: 'id',
            title: 'ID',
            type: 'number',
            sortable: true,
            filterable: false,
            editable: false,
            width: 80
        },
        {
            key: 'name',
            title: 'Nom',
            type: 'text',
            sortable: true,
            filterable: true,
            editable: true,
            required: true
        },
        {
            key: 'email',
            title: 'Email',
            type: 'email',
            sortable: true,
            filterable: true,
            editable: true,
            formatter: (value) => `<a href="mailto:${value}">${value}</a>`
        },
        {
            key: 'status',
            title: 'Statut',
            type: 'select',
            sortable: true,
            filterable: true,
            editable: true,
            options: ['Actif', 'Inactif', 'En attente'],
            formatter: (value) => {
                const colors = {
                    'Actif': '#28a745',
                    'Inactif': '#dc3545',
                    'En attente': '#ffc107'
                };
                return `<span style="color: ${colors[value] || '#6c757d'}; font-weight: bold;">${value}</span>`;
            }
        },
        {
            key: 'createdAt',
            title: 'Date de création',
            type: 'date',
            sortable: true,
            filterable: true,
            editable: false,
            formatter: (value) => new Date(value).toLocaleDateString('fr-FR')
        },
        {
            key: 'score',
            title: 'Score',
            type: 'number',
            sortable: true,
            filterable: true,
            editable: true,
            formatter: (value) => `${value}/100`
        }
    ];
    
    // Données d'exemple
    const sampleData = [
        {
            id: 1,
            name: 'Alice Martin',
            email: 'alice.martin@exemple.fr',
            status: 'Actif',
            createdAt: '2024-01-15',
            score: 85
        },
        {
            id: 2,
            name: 'Bob Dupont',
            email: 'bob.dupont@exemple.fr',
            status: 'Inactif',
            createdAt: '2024-01-20',
            score: 72
        },
        {
            id: 3,
            name: 'Claire Rousseau',
            email: 'claire.rousseau@exemple.fr',
            status: 'En attente',
            createdAt: '2024-02-01',
            score: 93
        },
        // ... plus de données
    ];
    
    // Options du tableau
    const tableOptions = {
        columns: columns,
        sortable: true,
        filterable: true,
        selectable: true,
        editable: true,
        pagination: true,
        resizable: true,
        itemsPerPage: 10,
        
        // Callbacks
        onRowSelect: (selectedRowIndexes) => {
            console.log('Lignes sélectionnées:', selectedRowIndexes);
            updateActionButtons(selectedRowIndexes.length > 0);
        },
        
        onRowEdit: (newData, originalData) => {
            console.log('Ligne modifiée:', { newData, originalData });
            // Ici, vous pourriez envoyer les modifications au serveur
            saveToServer(newData);
        },
        
        onDataChange: (newData) => {
            console.log('Données modifiées:', newData);
            // Sauvegarde automatique ou autres actions
        },
        
        onSort: (column, direction) => {
            console.log('Tri appliqué:', { column, direction });
        },
        
        onFilter: (searchTerm, filteredData) => {
            console.log('Filtre appliqué:', { searchTerm, resultCount: filteredData.length });
        }
    };
    
    // Création du tableau
    const dynamicTable = new DynamicTable(tableContainer, tableOptions);
    dynamicTable.setData(sampleData);
    
    // Fonctions utilitaires
    function updateActionButtons(hasSelection) {
        const bulkActions = document.querySelector('.bulk-actions');
        if (bulkActions) {
            bulkActions.style.display = hasSelection ? 'block' : 'none';
        }
    }
    
    function saveToServer(data) {
        // Simulation d'un appel API
        fetch('/api/users/' + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Données sauvegardées:', result);
        })
        .catch(error => {
            console.error('Erreur de sauvegarde:', error);
        });
    }
    
    // Actions supplémentaires
    document.getElementById('bulkDeleteBtn')?.addEventListener('click', () => {
        const selectedData = dynamicTable.getSelectedData();
        if (selectedData.length > 0 && confirm(`Supprimer ${selectedData.length} éléments ?`)) {
            selectedData.forEach(item => {
                // Logique de suppression
                console.log('Suppression de:', item);
            });
            dynamicTable.clearSelection();
        }
    });
    
    document.getElementById('exportBtn')?.addEventListener('click', () => {
        dynamicTable.exportData('csv');
    });
    
    document.getElementById('refreshBtn')?.addEventListener('click', () => {
        // Recharger les données depuis le serveur
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                dynamicTable.setData(data);
            });
    });
});
```

## Conclusion

Les grilles et tableaux dynamiques représentent une composante essentielle des interfaces web modernes, offrant aux utilisateurs des outils puissants pour interagir avec les données. La mise en œuvre de ces fonctionnalités requiert une compréhension approfondie des patterns de développement web, de la gestion d'état, et de l'optimisation des performances.

Cette approche modulaire et extensible permet de créer des composants réutilisables qui s'adaptent aux besoins spécifiques de chaque application, tout en maintenant une expérience utilisateur cohérente et professionnelle. L'investissement dans ces techniques se traduit par des interfaces plus intuitives, plus performantes, et plus satisfaisantes pour les utilisateurs finaux.
