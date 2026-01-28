function Filter({ filteredNames, handleFilteredNames }) {
    return (
        <form>
            <div>
                Filter shown with:
                <input
                    value={filteredNames}
                    onChange={handleFilteredNames} />
            </div>
        </form>
    )
}
export default Filter