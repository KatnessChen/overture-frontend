module.exports = {
  toLocaleDateTimeString(timestamp) {
    const d = new Date(timestamp);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString('it-IT')}`;
  },
  // npg = number per page
  // cp = current page
  pagered(list, npg, cp) {
    return list.filter((_, i) => i >= npg * (cp - 1) && i <= npg * cp - 1);
  },
  categoryStatistics(categories, articles) {
    // 統計每個分類有'幾篇'、'哪些'文章
    const total = {
      num: {},
      which: {},
    };

    articles.forEach((a) => {
      if (total.num[a.categoryName] === undefined) {
        total.num[a.categoryName] = 1;
      } else {
        total.num[a.categoryName] += 1;
      }
      if (total.which[a.categoryName] === undefined) {
        total.which[a.categoryName] = [];
      }
      total.which[a.categoryName].push(a.title);
    });

    const statistics = [];
    Object.keys(categories).forEach((key) => {
      statistics.push({
        id: categories[key].id,
        name: categories[key].name,
        count: total.num[categories[key].name] || 0,
        articles: total.which[categories[key].name],
      });
    });
    return statistics;
  },
};
