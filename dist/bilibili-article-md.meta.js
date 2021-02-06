// ==UserScript==
// @name        bilibili-article-md
// @version     0.0.1
// @author      Passkou
// @description 一个可将特别定制的 Markdown 格式转换成b站专栏格式的油猴脚本
// @homepage    https://github.com/Passkou/bilibili-article-md
// @supportURL  https://github.com/Passkou/bilibili-article-md/issues
// @run-at      document-end
// @include     *://member.bilibili.com/platform/*
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceURL
// @grant       GM_getResourceText
// @connect     *
// @resource    icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFmklEQVR4nO1a624bVRD+HOdet01LC0rrOgGpCEShksEqTW/I4kF4BJ7AP3gCPwIvgiWaNKVCVUVEoQKSKkQBeqFK0jgXe72LjnPWWq/P7vlm146Q6k/KxbtzOft5zuzszGKIIYYY4k1GRl37R0u/SCm4cGL24mYmm6XlAfwtdVKt1N4B8M+VhasYnxxn1ZTOc1Z4RLoojVutw0ORfEI/t9Wv3e3XA/OVlIDbrcaBRD4dAVu7Yh0WxxUBokWF9Xa3RBEwcALOqrThNpvwXJfVuQLgjMRJtVI7o/VwUN+H03RY1U8AzLDCSQi46esJomBE60lwI7g+QRSMaF1aWIrOfm4divKAdBt0yQu3AZ1z0hHQGOidoEt+UHlASkAOwKf+B7fRgOfReUDpnWAEq5XadNCPwv7uPlpOS+JrmhGUErAAYDR4wD1ssLpK7zopq+TGggc8z0N9m74dqqrpGiMoJaAnjIX1ABuaxu0yiG2QnoDBVITGxQ+iIpQQMGEKq1ajoeKTtXFN24lEtVJT4fu56Xx9pw6Xrz16tpEJEgJKACZ7jnreEQkcprQdm58p0wnP9bC3U2d99SRSEyQERIaUsB6whWbseWEeuGMTkBAQmVSE9YAtOVkIED0YWfMAS0BW3wKNcGWJcEHb60G1UsvayliVCD0+59ywXSNLwFUAp6JOqgW5fB44pe2ZoB5kTscpuy0Xe6/3WF8z2mYkWAKse6lPzwXUraufzwUsAdaiQpgHogilipfjJiDDPMoKC6Kbfj8yBCoC6tu7qhhgC4JYUhkCPgRwziakmiOu4+yTizqn7XZQrdTU57cZZafp/AzgMelLNUnfjzrJEEA/WnpO83dW1mBX8rh8F8BiCl8dMATQC3Nbre8EiwrblTRM7uqfpL466CsB8LxvUyzqfxkB7wK4RDp5MpY7uQKA3QbK7ns42v9zAAqk3m/FcukZgL8ArJI681H2bQRIvpXF0F8Gvn1p+Jv+t8F4LTYCJAvzL1yyKN9+EqIVvk/gqwv9JMC/8CQRkJSAJL66EEfALIDLpPH1XL6wrv9fA7BJ6l3+YnnjYwAfkPIbxXLpaeCzxJfycT58MI4AaVaO+xyJg8nsVwI/pm+c9ZUxXVO/CAgvjCZgJzfxZQo/UceiICIgSQL0QRPw4q2pyDLVAJPdVPVAFAGdwSSB57l84UlI7FcALxnll2enJvemrL1LhRfabhjqmeBfcq09fY0oAqydlABM34Bq2Swxyl4mg7W52B6Ij8ViuWRqBdG+TJ2tqItMWpgwx3uwNkdNs+NCPfE2iCIgTQK0He/BKkdAHKFJiq82TASoAeZnpLFtACsR5x6pJM8Y2bhwEo3x2BeulJ2fYs4rX2ybqGvuYCLgengAGoN7uXwhamSrji8zRtyRDNYKsXlguVguxY2GHdZXeHBqIqAf+58934ElDzB2EtUDJgLSVIBh0IuyEMDYSZQHwgTQc3UAqjn/0CLzo6p2GWPr+VNwRo05+UDbsYH2FdzmYY+Rg0kDHuTyBds0RLWKHzDGmqMj+POicfbyQ7FcYlrOLFHQib49OA0T0M/w9yHYBsZEKNnb4gZJGgLYhdFNiz/mja8SSi5KnAiDBFgHkwE0AdwnZe/r25QVTy+dbt8SA3AEfqBvheybVO33HYMEWAeTATzM5QvshLJOJMs2Diey2JzNdfkplkv0GxG6GHpEyrbfeA0SYB2ABiAJNUjkQ2Wx1I9U506QAMn+lzQjccwESNZ2yyfA2C6KgBpK3hMuaokdZqqCyDtKA67gMTfsi32DokOAsWEYgZVcvrAlXNQrdphZnx7Ds/PtF0off/1N+ZXQD3RzhB2czvoEDOL2FwYdmqvzM2n8iHR9AtL0//qup/OANM8k8pUkAiSFSRBSAtJEQNI1DjHEEEO8QQDwH6axntzNzYw/AAAAAElFTkSuQmCC
// @resource    style data:text/css;base64,I2JtZC10b29sYmFyLWl0ZW0gaW1nIHsNCiAgICBkaXNwbGF5OiBibG9jazsNCiAgICB3aWR0aDogMS4zZW07DQogICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzOw0KfQ0KI2JtZC10b29sYmFyLWl0ZW06aG92ZXIgew0KICAgIG9wYWNpdHk6IDAuNTsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQojYm1kLXRvb2xiYXItaXRlbSBpbnB1dFt0eXBlPWZpbGVdIHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgd2lkdGg6IDEwMCU7DQogICAgaGVpZ2h0OiAxMDAlOw0KICAgIGxlZnQ6IDA7DQogICAgdG9wOiAwOw0KICAgIG9wYWNpdHk6IDA7DQp9DQojYm1kLXRvb2xiYXItaXRlbSBpbnB1dFt0eXBlPWZpbGVdOmhvdmVyIHsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQojYm1kLXRvb2xiYXItaXRlbSB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KfQ0KDQojYm1kLWRyYWctaGludCB7DQogICAgZGlzcGxheTogbm9uZTsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgei1pbmRleDogMTsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBoZWlnaHQ6IDEwMCU7DQogICAgdG9wOiAwOw0KICAgIGxlZnQ6IDA7DQogICAgcG9pbnRlci1ldmVudHM6IG5vbmU7DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIGZvbnQtc2l6ZTogMmVtOw0KICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTsNCiAgICBjb2xvcjogcmVkOw0KICAgIGJvcmRlcjogM3B4IGRhc2hlZCByZWQ7DQp9DQoNCiNibWQtZHJhZy1oaW50IHNwYW4gew0KICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICB0b3A6IDUwJTsNCiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7DQp9DQoNCiNibWQtZHJhZy1oaW50LnNob3cgew0KICAgIGRpc3BsYXk6IGJsb2NrOw0KfQ==
// @icon64      data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFmklEQVR4nO1a624bVRD+HOdet01LC0rrOgGpCEShksEqTW/I4kF4BJ7AP3gCPwIvgiWaNKVCVUVEoQKSKkQBeqFK0jgXe72LjnPWWq/P7vlm146Q6k/KxbtzOft5zuzszGKIIYYY4k1GRl37R0u/SCm4cGL24mYmm6XlAfwtdVKt1N4B8M+VhasYnxxn1ZTOc1Z4RLoojVutw0ORfEI/t9Wv3e3XA/OVlIDbrcaBRD4dAVu7Yh0WxxUBokWF9Xa3RBEwcALOqrThNpvwXJfVuQLgjMRJtVI7o/VwUN+H03RY1U8AzLDCSQi46esJomBE60lwI7g+QRSMaF1aWIrOfm4divKAdBt0yQu3AZ1z0hHQGOidoEt+UHlASkAOwKf+B7fRgOfReUDpnWAEq5XadNCPwv7uPlpOS+JrmhGUErAAYDR4wD1ssLpK7zopq+TGggc8z0N9m74dqqrpGiMoJaAnjIX1ABuaxu0yiG2QnoDBVITGxQ+iIpQQMGEKq1ajoeKTtXFN24lEtVJT4fu56Xx9pw6Xrz16tpEJEgJKACZ7jnreEQkcprQdm58p0wnP9bC3U2d99SRSEyQERIaUsB6whWbseWEeuGMTkBAQmVSE9YAtOVkIED0YWfMAS0BW3wKNcGWJcEHb60G1UsvayliVCD0+59ywXSNLwFUAp6JOqgW5fB44pe2ZoB5kTscpuy0Xe6/3WF8z2mYkWAKse6lPzwXUraufzwUsAdaiQpgHogilipfjJiDDPMoKC6Kbfj8yBCoC6tu7qhhgC4JYUhkCPgRwziakmiOu4+yTizqn7XZQrdTU57cZZafp/AzgMelLNUnfjzrJEEA/WnpO83dW1mBX8rh8F8BiCl8dMATQC3Nbre8EiwrblTRM7uqfpL466CsB8LxvUyzqfxkB7wK4RDp5MpY7uQKA3QbK7ns42v9zAAqk3m/FcukZgL8ArJI681H2bQRIvpXF0F8Gvn1p+Jv+t8F4LTYCJAvzL1yyKN9+EqIVvk/gqwv9JMC/8CQRkJSAJL66EEfALIDLpPH1XL6wrv9fA7BJ6l3+YnnjYwAfkPIbxXLpaeCzxJfycT58MI4AaVaO+xyJg8nsVwI/pm+c9ZUxXVO/CAgvjCZgJzfxZQo/UceiICIgSQL0QRPw4q2pyDLVAJPdVPVAFAGdwSSB57l84UlI7FcALxnll2enJvemrL1LhRfabhjqmeBfcq09fY0oAqydlABM34Bq2Swxyl4mg7W52B6Ij8ViuWRqBdG+TJ2tqItMWpgwx3uwNkdNs+NCPfE2iCIgTQK0He/BKkdAHKFJiq82TASoAeZnpLFtACsR5x6pJM8Y2bhwEo3x2BeulJ2fYs4rX2ybqGvuYCLgengAGoN7uXwhamSrji8zRtyRDNYKsXlguVguxY2GHdZXeHBqIqAf+58934ElDzB2EtUDJgLSVIBh0IuyEMDYSZQHwgTQc3UAqjn/0CLzo6p2GWPr+VNwRo05+UDbsYH2FdzmYY+Rg0kDHuTyBds0RLWKHzDGmqMj+POicfbyQ7FcYlrOLFHQib49OA0T0M/w9yHYBsZEKNnb4gZJGgLYhdFNiz/mja8SSi5KnAiDBFgHkwE0AdwnZe/r25QVTy+dbt8SA3AEfqBvheybVO33HYMEWAeTATzM5QvshLJOJMs2Diey2JzNdfkplkv0GxG6GHpEyrbfeA0SYB2ABiAJNUjkQ2Wx1I9U506QAMn+lzQjccwESNZ2yyfA2C6KgBpK3hMuaokdZqqCyDtKA67gMTfsi32DokOAsWEYgZVcvrAlXNQrdphZnx7Ds/PtF0off/1N+ZXQD3RzhB2czvoEDOL2FwYdmqvzM2n8iHR9AtL0//qup/OANM8k8pUkAiSFSRBSAtJEQNI1DjHEEEO8QQDwH6axntzNzYw/AAAAAElFTkSuQmCC
// @updateURL   https://raw.githubusercontent.com/Passkou/bilibili-article-md/main/dist/bilibili-article-md.user.js
// ==/UserScript==