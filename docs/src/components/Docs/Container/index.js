import { window } from 'global';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Nav from '../Nav';
import NavDropdown from '../Nav/dropdown';
import Content from '../Content';
import './style.css';

const getEditUrl = (selectedSectionId, selectedItemId) => {
  const gitHubRepoUrl = 'https://github.com/wingsuit-designsystem/wingsuit';
  const docPath = `${selectedSectionId}/${selectedItemId}`;

  return `${gitHubRepoUrl}/blob/master/docs/src/pages/${docPath}/index.md`;
};

class Search extends Component {
  componentDidMount() {
    window.docsearch({
      apiKey: 'fae96724816fdc3cd16b899557964910',
      indexName: 'wingsuit-designsystem',
      inputSelector: '#search',
      debug: false,
    });
  }

  render() {
    return (
      <div className="search">
        <input
          className="form-control form-control-sm"
          type="search"
          id="search"
          placeholder="type to search"
        />
      </div>
    );
  }
}

const Container = ({ sections, selectedItem, selectedSectionId, selectedItemId }) => (
  <div id="docs-container" className="row">
    <div className="nav col-lg-3 col-md-3 d-none d-md-block">
      <Nav
        sections={sections}
        selectedSection={selectedItem.section}
        selectedItem={selectedItem.id}
        selectedSectionId={selectedSectionId}
        selectedItemId={selectedItemId}
      />
    </div>
    <div className="content col-xs-12 col-sm-12 col-md-9 col-lg-9">
      <Search />
      <div className="nav-dropdown">
        <NavDropdown
          sections={sections}
          selectedSection={selectedItem.section}
          selectedItem={selectedItem.id}
        />
      </div>

      <Content
        title={selectedItem.title}
        content={selectedItem.content}
        editUrl={getEditUrl(selectedSectionId, selectedItemId)}
      />

      <div className="nav-dropdown">
        <NavDropdown
          sections={sections}
          selectedSection={selectedItem.section}
          selectedItem={selectedItem.id}
        />
      </div>
    </div>
  </div>
);
Container.propTypes = {
  sections: PropTypes.array, // eslint-disable-line
  selectedItem: PropTypes.object, // eslint-disable-line
  selectedSectionId: PropTypes.string.isRequired,
  selectedItemId: PropTypes.string.isRequired,
};

export { Container as default };
