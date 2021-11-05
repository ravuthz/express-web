const express = require('express');
const { Op } = require('sequelize');

module.exports = (Collection) => {
  const defaultPageSize = 10;

  const create = (req, res) => {
    const data = req.body;
    Collection.create(data)
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log('Create Error: ', error);
        res.sendStatus(500);
      });
  };

  const update = (req, res) => {
    const data = req.body;
    Collection.update(data, { where: { id: req.params._id }})
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log('Update Error: ', error);
        res.sendStatus(500);
      });
  };

  const remove = (req, res) => {
    Collection.destroy({ where: { id: req.params._id } })
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log('Delete Error: ', error);
        res.sendStatus(500);
      });
  };

  const find = (req, res) => {
    const { _id } = req.params;
    Collection.findByPk(_id)
      .then(result => {
        if (result) {
          res.send(result);
        } else {
          res.status(404).send(null);
        }
      })
      .catch(error => {
        console.log('Find Error: ', error);
        res.status(500).send(error);
      });
  };
  
  const list = (req, res) => {
    const { page, size, ...other } = req.query || {};
    const filter = getFilter({ page, size, ...other });
    console.log({ filter });
    Collection.findAndCountAll(filter)
      .then((result) => {
        const response = getPagingData(result, page, size);
        res.send(response);
      })
      .catch((error) => {
        console.log('List Error: ', error);
        res.status(500).send(error);  
      });
  };

  /**
   * Filter by pagination, and sort
   * page default 1
   * size default ${defaultPageSize}
   * sort default ['id', 'DESC']
   * @param { page, size, sort } options 
   * @returns 
   */
  const getFilter = ({ page, size, sort }) => {
    const limit = size ? size * 1 : defaultPageSize;
    const offset = page ? (page-1) * limit : 0;

    let order = [];
    if (sort) {
      for (const key in sort) {
        order.push([key, sort[key]]);
      }
    } else {
      order = [['id', 'DESC']];
    }

    return { limit, offset, order };
  };

  const getPagingData = (data, page, size) => {
    const { count: total, rows: items } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(total / (size || defaultPageSize));
    return { total, items, totalPages, currentPage };
  };

  let router = express.Router();

  router.get('/', list);
  router.post('/', create);
  router.get('/:_id', find);
  router.put('/:_id', update);
  router.delete('/:_id', remove);

  return router;

}