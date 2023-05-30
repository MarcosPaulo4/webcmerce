'use client'

import ProductImage from '@/components/ProductImage'
import { Dialog } from '@headlessui/react'
import { StarIcon as StarIconOutLine } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function Modal() {
  let [isOpen, setIsOpen] = useState(true)
  const id = useParams().id
  const [product, setProduct] = useState<Product>()
  {
    /*const router = useRouter()*/
  }
  {
    /*<--'useRouter' at the moment of building wasn't workin, so isn't declared-->*/
  }

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`)
      const product = await res.json()

      setProduct(product)
    }

    fetchProduct()
  }, [id])

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
            <div className="flex gap-x-8 h-96">
              {product?.image && (
                <div className="relative w-72 h-full hidden md:inline">
                  <ProductImage product={product} fill />
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="font-semibold">{product?.title}</h4>
                  <p className="font-medium text-sm">R${product?.price}</p>
                </div>

                <div className="flex items-center text-sm my-4">
                  <p>{product?.rating.rate}</p>
                  <div className="flex items-center ml-2 mr-6">
                    {Array.from(
                      { length: Math.floor(product?.rating?.rate ?? 0) },
                      (_, i) => (
                        <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                      )
                    )}

                    {Array.from(
                      { length: 5 - Math.floor(product?.rating?.rate ?? 0) },
                      (_, i) => (
                        <StarIconOutLine
                          key={i}
                          className="h-4 w-4 text-yellow-500"
                        />
                      )
                    )}
                  </div>
                  <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                    Ver todas as {product?.rating.count} avaliações
                  </p>
                </div>
                <p className="line-clamp-5 text-sm">{product?.description}</p>

                <div className="space-y-3 text-sm mt-4">
                  <button
                    className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent
                hover:text-black"
                  >
                    Adicionar ao carrinho
                  </button>
                  {/*<--'useRouter' at the moment of building wasn't workin, so isn't declared-->*/}
                  <button
                    onClick={() => router.push(`/product/${product?.id}`)}
                    className="bg-white text-blue-600 w-full rounded-full border border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Ver todos os detalhes
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
