import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allProduct: any[], searchTerm: String, propsName: any): any[] {
    const result: any[] = []
    if (!allProduct || searchTerm == '' || propsName == '') {
      return allProduct;
    }
    allProduct.forEach((item: any) => {
      if (item[propsName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())) {
        result.push(item)
      }
    })
    return result;
  }
}
